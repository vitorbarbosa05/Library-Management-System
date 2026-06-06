import {Router} from "express";
import {createAuthorValidator, updateAuthorValidator} from "./author.validator.js";
import {validate} from "../../shared/middlewares/validation.middleware.js";
import {authMiddleware} from "../../shared/middlewares/auth.middleware.js";
import {requireRole} from "../../shared/middlewares/role.middleware.js";
import {createAuthor, deleteAuthor, getAllAuthors, getAuthorByPublicId, updateAuthor} from "./author.controller.js";

const authorRouter = Router();

authorRouter.post("/",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN"),
    createAuthorValidator,
    validate,
    createAuthor
);

authorRouter.patch("/:id",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN"),
    updateAuthorValidator,
    validate,
    updateAuthor
);

authorRouter.delete("/:id",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN"),
    deleteAuthor
);

authorRouter.get("/",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN", "MEMBER"),
    getAllAuthors
);

authorRouter.get("/:id",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN", "MEMBER"),
    getAuthorByPublicId
);

export default authorRouter;