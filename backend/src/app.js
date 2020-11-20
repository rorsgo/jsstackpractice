import { resolve } from "path";
import express from "express";
import cors from "cors";
import "express-async-errors";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import Youch from "youch";

import routes from "./routes";
import "./database";

class App {
  constructor() {
    this.server = express();
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express(this.server),
      ],
      tracesSampleRate: process.env.SENTRY_TRACERATE,
    });
    this.middleware();
    this.routes();
    this.exceptionHandler();
  }

  middleware() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use("/files", express.static(resolve(__dirname, "..", "tmp", "uploads")));
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (error, request, response, next) => {
      if(process.env.NODE_ENV === "development") {
        const errors = await new Youch(error, request).toJSON();
  
        return response.status(500).json(errors);
      }

      return response.status(500).json({ error: "Internal server error."});
    });
  }
}

export default new App().server;