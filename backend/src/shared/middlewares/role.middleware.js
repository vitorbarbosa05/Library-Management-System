import {ForbiddenError} from "../errors/ForbiddenError.js";
import {logger} from "../logger/logger.js";

export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            logger.error("Insufficient permissions")
            return next(new ForbiddenError("Insufficient permissions"));
        }

        next();
    };
}