import { Router } from "express";
import User from "./app/models/User";

const routes = new Router();

routes.get("/", async (request, response) => {
  const user = await User.create({
    name: "User",
    email: "example@email.com",
    password_hash: "hash1@example@1hash",
  });
  return response.json(user);
});

export default routes;