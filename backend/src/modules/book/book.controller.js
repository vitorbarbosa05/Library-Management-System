import * as bookService from "./book.service.js";
import {toBookCreate} from "./dto/book.create.dto.js";

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