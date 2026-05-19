import express from "express";
import actuatorRouter from "./actuator/index.js";
import {errorMiddleware} from "./shared/errors/error.middleware.js";

const app = express();

app.use(express.json());
app.use('/api/v1/actuator', actuatorRouter);

app.use(errorMiddleware);

export default app;