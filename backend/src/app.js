import express from "express";
import helmet from "helmet";
import cors from "cors";

import {errorMiddleware} from "./shared/errors/error.middleware.js";
import {apiRateLimiter} from "./shared/middlewares/rate-limit.middleware.js";

import actuatorRouter from "./actuator/index.js";
import authRouter from "./modules/auth/route/auth.routes.js";
import bookRouter from "./modules/book/route/book.route.js";
import authorRouter from "./modules/author/route/author.route.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") ?? ["http://localhost:5173"];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/actuator", actuatorRouter);

app.use("/api/v1", apiRateLimiter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/books", bookRouter);

app.use(errorMiddleware);

export default app;