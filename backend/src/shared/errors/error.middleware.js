import {AppError} from "./AppError.js";
import {logger} from "../logger/logger.js";

export function errorMiddleware(err, req, res, next) {
    const isAppError = err instanceof AppError;

    logger.error({
        message: err.message,
        name: err.name,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method
    });

    const statusCode = isAppError ? err.statusCode : 500;
    const publicMessage = isAppError ? err.message : "Internal server error";

    return res.status(statusCode).json({
        success: false,
        error: {
            message: publicMessage
        }
    });
}