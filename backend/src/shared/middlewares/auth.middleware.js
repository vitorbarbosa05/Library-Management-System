import jwt from "jsonwebtoken";
import {UnauthorizedError} from "../errors/UnauthorizedError.js";
import {AppError} from "../errors/AppError.js";
import {logger} from "../logger/logger.js";

const JWT_ISSUER = "library-backend";
const JWT_AUDIENCE = "library-api";
const JWT_ALGORITHM = "HS256"

function getJwtSecret() {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new AppError("JWT configuration error", 500);
    }
    return secret;
}

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logger.warn(
            {path: req.originalUrl, method: req.method},
            "Missing or invalid authorization header"
        );

        return next(new UnauthorizedError("Missing or invalid authorization header"));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, getJwtSecret(), {
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE,
            algorithm: JWT_ALGORITHM
        });

        req.user = {
            id: decoded.sub,
            role: decoded.role
        };

        return next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            logger.warn(
                {path: req.originalUrl, method: req.method},
                "Token expired"
            );

            return next(new UnauthorizedError("Token expired"));
        }
        if (err.name === "JsonWebTokenError") {
            logger.warn(
                {path: req.originalUrl, method: req.method},
                "Invalid token"
            );

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