import {Router} from "express";
import {authRateLimiter} from "../../../shared/middlewares/rate-limit.middleware.js";
import {loginValidator, registerValidator} from "../validator/auth.validator.js";
import {validate} from "../../../shared/middlewares/validation.middleware.js";
import {login, register} from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", authRateLimiter, registerValidator, validate, register);
authRouter.post("/login", authRateLimiter, loginValidator, validate, login);

export default authRouter;