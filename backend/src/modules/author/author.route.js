import {Router} from "express";
import {createAuthorValidtor, updateAuthorValidtor} from "./author.validator.js";
import {validate} from "../../shared/middlewares/validation.middleware.js";
import {authMiddleware} from "../../shared/middlewares/auth.middleware.js";
import {requireRole} from "../../shared/middlewares/role.middleware.js";
import {createAuthor, updateAuthor, deleteAuthor} from "./author.controller.js";

const authorRouter = Router();

authorRouter.post("/",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN"),
    createAuthorValidtor,
    validate,
    createAuthor
);

authorRouter.patch("/:id",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN"),
    updateAuthorValidtor,
    validate,
    updateAuthor
);

authorRouter.delete("/:id",
    authMiddleware,
    requireRole("ADMIN", "LIBRARIAN"),
    deleteAuthor
);

export default authorRouter;