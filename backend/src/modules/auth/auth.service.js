import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {logger} from "../../shared/logger/logger.js";
import prisma from "../../../prisma/prisma.client.js";
import {AppError} from "../../shared/errors/AppError.js";
import {hashEmail} from "../../shared/utils/crypto.utils.js";

export async function register(name, email, password) {
    const emailHash = hashEmail(email);
    const existingUser = await prisma.user.findUnique({where: {email}});
    if (existingUser) {
        logger.warn({emailHash}, "Register blocked: email already exists");
        throw new AppError("Email already exists", 409);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    logger.info({emailHash}, "Register success");

    const token = jwt.sign(
        {userId: user.id, email: user.email, role: user.role},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || "1h"}
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    };
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
    logger.info({emailHash, userId: existingUser.id}, "Login success");

    const token = jwt.sign(
        {userId: existingUser.id, email: existingUser.email, role: existingUser.role},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || "1h"}
    );

    return {
        user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        },
        token
    };
}