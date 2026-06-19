import {AppError} from "../../../shared/errors/AppError.js";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 12;
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

export function generateAccessToken(user) {
    return jwt.sign({
            role: user.role
        },
        getJwtSecret(),
        {
            subject: user.publicId,
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE,
            algorithm: JWT_ALGORITHM,
            jwtid: crypto.randomUUID(),
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
}