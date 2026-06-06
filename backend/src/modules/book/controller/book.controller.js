import * as bookService from "../service/book.service.js";
import {toBookCreate} from "../dto/book.create.dto.js";
import {toBookUpdate} from "../dto/book.update.dto.js";

export const createBook = async (req, res, next) => {
    try {
        const bookData = toBookCreate(req.body);
        const result = await bookService.createBook(bookData);
        res.status(201).json({
            message: "Book created successfully",
            book: result,
        });
    } catch (error) {
        next(error);
    }
};


export const updateBook = async (req, res, next) => {
    try {
        const {id} = req.params;
        const bookData = toBookUpdate(req.body);
        const result = await bookService.update(id, bookData);
        res.status(200).json({
            message: "Book updated successfully",
            book: result,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await bookService.deleteBook(id);
        res.status(200).json({
            message: "Book deleted successfully",
            book: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllBooks = async (req, res, next) => {
    try {
        const result = await bookService.getAllBooks({
            page: req.query.page,
            size: req.query.size,
            sort: req.query.sort,
            order: req.query.order,
            search: req.query.search,
        });
        res.status(200).json({
            message: "Books found successfully",
            book: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getBookByPublicId = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await bookService.getBookByPublicId(id);
        res.status(200).json({
            message: "Book by publicId list successfully",
            book: result,
        })

    } catch (error) {
        next(error);
    }
}