import express from "express";
import actuatorRouter from "./actuator/index.js";
import {errorMiddleware} from "./shared/errors/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());
app.use('/api/v1/actuator', actuatorRouter);
app.use('/api/v1/auth', authRouter)

app.use(errorMiddleware);

export default app;