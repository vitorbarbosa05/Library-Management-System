import * as authorService from "./author.service.js";
import {toAuthorCreate} from "./dto/author.create.dto.js";
import {toAuthorUpdate} from "./dto/author.update.dto.js";

export const createAuthor = async (req, res, next) => {
    try {
        const authorData = toAuthorCreate(req.body);
        const result = await authorService.createAuthor(authorData);
        res.status(201).json({
            message: "Author created successfully",
            author: result,
        });
    } catch (error) {
        next(error);
    }
}

export const updateAuthor = async (req, res, next) => {
    try {
        const {id} = req.params;
        const authorData = toAuthorUpdate(req.body);
        const result = await authorService.updateAuthor(id, authorData);
        res.status(200).json({
            message: "Author updated successfully",
            author: result,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteAuthor = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await authorService.deleteAuthor(id);
        res.status(200).json({
            message: "Author deleted successfully",
            author: result,
        });
    } catch (error) {
        next(error);
    }
}