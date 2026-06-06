import {body} from "express-validator";

export const createAuthorValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({min: 2, max: 200}).withMessage("Name must be between 2 and 200 characters"),

    body("bio")
        .optional()
        .trim()
        .isLength({max: 2000}).withMessage("Bio must be at most 2000 characters"),
];

export const updateAuthorValidator = [
    body("name")
        .optional()
        .trim()
        .isLength({min: 2, max: 200}).withMessage("Name must be between 2 and 200 characters"),

    body("bio")
        .optional()
        .trim()
        .isLength({max: 2000}).withMessage("Bio must be at most 2000 characters"),
];