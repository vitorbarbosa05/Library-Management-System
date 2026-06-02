import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../prisma/prisma.client.js";
import {AppError} from "../../shared/errors/AppError.js";

export async function register(name, email, password) {
    const existingUser = await prisma.user.findUnique({where: {email}});
    if (existingUser) {
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
    const existingUser = await prisma.user.findUnique({where: {email}});
    if (!existingUser) {
        throw new AppError("Invalid credentials", 401);
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
        throw new AppError("Invalid credentials", 401);
    }

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