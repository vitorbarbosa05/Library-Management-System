import {Router} from "express";
import {createBookValidator, updateBookValidator} from "../validator/book.validator.js";
import {validate} from "../../../shared/middlewares/validation.middleware.js";
import {authMiddleware} from "../../../shared/middlewares/auth.middleware.js";
import {requireRole} from "../../../shared/middlewares/role.middleware.js";
import {createBook, updateBook, deleteBook, getAllBooks, getBookByPublicId} from "../controller/book.controller.js";

const bookRouter = Router();

bookRouter.post("/",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN"),
    createBookValidator,
    validate,
    createBook
);

bookRouter.patch("/:id",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN"),
    updateBookValidator,
    validate,
    updateBook
);

bookRouter.delete("/:id",
    authMiddleware,
    requireRole("ADMIN"),
    deleteBook
);

bookRouter.get("/",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN", "MEMBER"),
    getAllBooks
);

bookRouter.get("/:id",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN", "MEMBER"),
    getBookByPublicId
);

export default bookRouter;