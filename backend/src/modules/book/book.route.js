import {Router} from "express";
import {createBookValidator, updateBookValidator} from "./book.validator.js";
import {validate} from "../../shared/middlewares/validation.middleware.js";
import {authMiddleware} from "../../shared/middlewares/auth.middleware.js";
import {requireRole} from "../../shared/middlewares/role.middleware.js";
import {createBook, updateBook, deleteBook} from "./book.controller.js";

const bookRouter = Router();

bookRouter.post(
    "/",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN"),
    createBookValidator,
    validate,
    createBook
);

bookRouter.patch(
    "/:id",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN"),
    updateBookValidator,
    validate,
    updateBook
);

bookRouter.delete(
    "/:id",
    authMiddleware,
    requireRole("ADMIN"),
    deleteBook
);

export default bookRouter;