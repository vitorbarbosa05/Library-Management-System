import jwt from "jsonwebtoken";
import {UnauthorizedError} from "../errors/UnauthorizedError.js";
import {AppError} from "../errors/AppError.js";
import {logger} from "../logger/logger.js";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logger.warn({path: req.originalUrl, method: req.method}, "Missing or invalid authorization header");
        return next(new UnauthorizedError("Missing or invalid authorization header"));
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_ACCESS_SECRET) {
        logger.error({path: req.originalUrl, method: req.method}, "JWT configuration error");
        return next(new AppError("JWT configuration error", 500));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        req.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };

        return next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            logger.warn({path: req.originalUrl, method: req.method}, "Token expired");
            return next(new UnauthorizedError("Token expired"));
        }
        if (err.name === "JsonWebTokenError") {
            logger.warn({path: req.originalUrl, method: req.method}, "Invalid token");
            return next(new UnauthorizedError("Invalid token"));
        }
        logger.error({
            name: err.name,
            message: err.message,
            path: req.originalUrl,
            method: req.method
        }, "Authentication error");
        return next(new AppError("Authentication error", 500));
    }
}