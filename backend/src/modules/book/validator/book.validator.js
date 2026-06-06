import {body} from "express-validator";

export const createBookValidator = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({max: 200}).withMessage("Title too long"),

    body("genre")
        .trim()
        .notEmpty().withMessage("Genre is required")
        .isIn(["FANTASY", "SCIENCE_FICTION", "ACTION_ADVENTURE", "MYSTERY", "HORROR", "THRILLER_SUSPENSE", "HISTORICAL_FICTION", "ROMANCE", "SHORT_STORY", "CHILDRENS", "AUTOBIOGRAPHY", "FOOD_DRINK", "ART", "SELF_HELP", "HISTORY", "TRAVEL", "CRIME"])
        .withMessage("Invalid genre"),

    body("publishDate")
        .notEmpty().withMessage("Publish date is required")
        .isISO8601().withMessage("Publish date must be a valid date"),

    body("isbn")
        .trim()
        .notEmpty().withMessage("ISBN is required")
        .isISBN().withMessage("Invalid ISBN format"),

    body("stock")
        .exists().withMessage("Stock is required")
        .isInt({min: 0}).withMessage("Stock must be a non negative integer"),

    body("authorIds")
        .isArray({min: 1}).withMessage("At least one author is required"),

    body("authorIds.*")
        .isUUID().withMessage("Each authorId must be a valid UUID"),
];

export const updateBookValidator = [
    body("title")
        .optional()
        .trim()
        .isLength({max: 200}),

    body("genre")
        .optional()
        .trim()
        .isIn(["FANTASY", "SCIENCE_FICTION", "ACTION_ADVENTURE", "MYSTERY", "HORROR", "THRILLER_SUSPENSE", "HISTORICAL_FICTION", "ROMANCE", "SHORT_STORY", "CHILDRENS", "AUTOBIOGRAPHY", "FOOD_DRINK", "ART", "SELF_HELP", "HISTORY", "TRAVEL", "CRIME"])
        .withMessage("Invalid genre"),

    body("publishDate")
        .optional()
        .isISO8601(),

    body("isbn")
        .optional()
        .trim()
        .isISBN(),

    body("stock")
        .optional()
        .isInt({min: 0}),

    body("authorIds")
        .optional()
        .isArray({min: 1}),

    body("authorIds.*")
        .optional()
        .isUUID(),
];