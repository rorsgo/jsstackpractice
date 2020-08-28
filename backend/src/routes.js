import { Router } from "express";
import multer from "multer";

import multerConfig from "./config/multer";
import authMiddleware from "./app/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import AppointmentController from "./app/controllers/AppointmentController";

const routes = new Router();
const uploads = multer(multerConfig);

routes.use(authMiddleware);

routes.get("/providers", ProviderController.index);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.post("/files", uploads.single("file"), FileController.store);
routes.post("/appointments", AppointmentController.store);

routes.put("/users", UserController.update);

export default routes;