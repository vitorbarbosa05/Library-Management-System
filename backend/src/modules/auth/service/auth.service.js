import bcrypt from "bcryptjs";
import {logger} from "../../../shared/logger/logger.js";
import prisma from "../../../../prisma/prisma.client.js";
import {AppError} from "../../../shared/errors/AppError.js";
import {toAuthResponse} from "../dto/auth.response.dto.js";
import {toUserResponse} from "../dto/user.response.dto.js";
import {generateAccessToken} from "./token.service.js";
import {hashEmail} from "../../../shared/utils/crypto.utils.js";

export async function register(name, email, password) {
    const emailHash = hashEmail(email);
    const existingUser = await prisma.user.findUnique({where: {email}});

    if (existingUser) {
        logger.warn({emailHash}, "Register blocked: user already exists");
        throw new AppError("User already exists", 409);
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

    logger.info({publicId: user.publicId}, "Register success");

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
        logger.warn({publicId: existingUser.publicId}, "Login failed: password mismatch");
        throw new AppError("Invalid credentials", 401);
    }

    logger.info({publicId: existingUser.publicId}, "Login success");

    const token = generateAccessToken(existingUser);

    return toAuthResponse(existingUser, token);
}

export async function me(publicId) {
    const existingUser = await prisma.user.findUnique({where: {publicId}});

    if (!existingUser) {
        logger.warn({publicId}, "Me failed: user not found");
        throw new AppError("Authenticated user not found", 401);
    }

    return toUserResponse(existingUser);
}