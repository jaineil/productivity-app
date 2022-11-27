import express from "express";
import { UserController } from "../controllers/user.controller.js";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post("/create-user", userController.createUser);

export default userRoutes;
