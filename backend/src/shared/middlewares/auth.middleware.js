import jwt from "jsonwebtoken";
import {UnauthorizedError} from "../errors/UnauthorizedError.js";
import {AppError} from "../errors/AppError.js";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new UnauthorizedError("Missing or invalid authorization header"));
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_ACCESS_SECRET) {
        return next(new AppError("JWT configuration error", 500));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        req.user = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role
        };

        return next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(new UnauthorizedError("Token expired"));
        }
        if (err.name === "JsonWebTokenError") {
            return next(new UnauthorizedError("Invalid token"));
        }
        return next(new AppError("Authentication error", 500));
    }
}