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

// login recebe email e password e faz:
//
// Procurar o user pelo email
// Se não existir → lançar erro (401 Unauthorized)
// Comparar a password enviada com o hash guardado (bcrypt.compare)
// Se não coincidir → lançar erro (401)
// Gerar um access token JWT
// Devolver o user e o token