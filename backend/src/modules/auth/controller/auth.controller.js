import * as authService from "../service/auth.service.js";
import {AppError} from "../../../shared/errors/AppError.js";

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const result = await authService.register(name, email, password);
        res.status(201).json({
            message: "Register successfully",
            user: result.user,
            token: result.token
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await authService.login(email, password);
        res.status(200).json({
            message: "Logged in successfully",
            user: result.user,
            token: result.token
        });
    } catch (error) {
        next(error);
    }
};

export const me = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError("Authenticated user not found", 401);
        }

        const user = await authService.me(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Authenticated user retrieved successfully",
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
}