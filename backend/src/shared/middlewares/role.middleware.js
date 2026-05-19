import {ForbiddenError} from "../errors/ForbiddenError.js";

export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next(new ForbiddenError("Insufficient permissions"));
        }

        next();
    };
}