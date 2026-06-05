import {body} from "express-validator";

export const createAuthorValidtor = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({max: 200}).withMessage("Name too long"),

    body("bio")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({max: 200}).withMessage("Name too long"),
]

export const updateAuthorValidtor = [
    body("name")
        .optional()
        .trim()
        .isLength({max: 200}),

    body("bio")
        .optional()
        .trim()
        .isLength({max: 200}),
]