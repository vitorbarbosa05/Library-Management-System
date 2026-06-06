import * as authService from "../service/auth.service.js";

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