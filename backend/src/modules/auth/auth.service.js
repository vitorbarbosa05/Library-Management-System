import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {logger} from "../../shared/logger/logger.js";
import prisma from "../../../prisma/prisma.client.js";
import {AppError} from "../../shared/errors/AppError.js";
import {hashEmail} from "../../shared/utils/crypto.utils.js";
import {toAuthResponse} from "./dto/auth.response.dto.js";

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

function generateAccessToken(user) {
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

export async function register(name, email, password) {
    const emailHash = hashEmail(email);
    const existingUser = await prisma.user.findUnique({where: {email}});

    if (existingUser) {
        logger.warn({emailHash}, "Register blocked: email already exists");
        throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    let user;

    try {
        user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
    } catch (error) {
        if (error.code === "P2002") {
            logger.warn({emailHash}, "Register blocked: email already exists");
            throw new AppError("Email already exists", 409);
        }
        throw error;
    }

    logger.info({emailHash}, "Register success");

    const token = generateAccessToken(user);

    return toAuthResponse(user, token);
}

export async function login(email, password) {
    const emailHash = hashEmail(email);
    const existingUser = await prisma.user.findUnique({where: {email}});

    if (!existingUser) {
        logger.warn({emailHash}, "Login failed: user not found");
        throw new AppError("Invalid credentials", 401);
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
        logger.warn({emailHash}, "Login failed: password mismatch");
        throw new AppError("Invalid credentials", 401);
    }

    logger.info({emailHash}, "Login success");

    const token = generateAccessToken(existingUser);

    return toAuthResponse(existingUser, token);
}