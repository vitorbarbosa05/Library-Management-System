import {Router} from "express";
import {authRateLimiter} from "../../../shared/middlewares/rate-limit.middleware.js";
import {loginValidator, registerValidator} from "../validator/auth.validator.js";
import {validate} from "../../../shared/middlewares/validation.middleware.js";
import {login, me, register} from "../controller/auth.controller.js";
import {authMiddleware} from "../../../shared/middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", authRateLimiter, registerValidator, validate, register);
authRouter.post("/login", authRateLimiter, loginValidator, validate, login);

authRouter.get("/me", authMiddleware, me);

export default authRouter;