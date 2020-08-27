import { Router } from "express";
import multer from "multer";

import multerConfig from "./config/multer";
import authMiddleware from "./app/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

const routes = new Router();
const uploads = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.post("/files", uploads.single("file"), (request, response) => {
  return response.json({ ok: true });
});

routes.use(authMiddleware);

routes.put("/users", UserController.update);
export default routes;