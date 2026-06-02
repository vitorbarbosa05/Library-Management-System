import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "./auth.validator.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, validate, register);
authRouter.post("/login", loginValidator, validate, login);

export default authRouter;