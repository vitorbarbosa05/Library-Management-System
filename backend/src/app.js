import express from "express";
import actuatorRouter from "./actuator/index.js";

const app = express();

app.use(express.json());
app.use('/api/v1/actuator', actuatorRouter);

export default app;