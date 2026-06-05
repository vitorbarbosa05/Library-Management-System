import express from "express";
import actuatorRouter from "./actuator/index.js";
import {errorMiddleware} from "./shared/errors/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import bookRouter from "./modules/book/book.route.js";
import authorRouter from "./modules/author/author.route.js";

const app = express();

app.use(express.json());
app.use('/api/v1/actuator', actuatorRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/books', bookRouter);

app.use(errorMiddleware);

export default app;