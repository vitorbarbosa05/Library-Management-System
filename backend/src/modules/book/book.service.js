import prisma from "../../../prisma/prisma.client.js";
import {logger} from "../../shared/logger/logger.js";
import {toBookResponse} from "./dto/book.response.dto.js";
import {AppError} from "../../shared/errors/AppError.js";

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;
const MAX_SIZE = 100;
const ALLOWED_SORT = ["id", "title", "genre", "isbn", "stock", "createdAt", "updatedAt"];

export async function createBook({title, genre, publishDate, isbn, stock, authorIds}) {
    const existingISBN = await prisma.book.findUnique({where: {isbn}});
    if (existingISBN) {
        logger.warn({isbn}, "Create blocked: ISBN already exists");
        throw new AppError("ISBN already exists", 409);
    }

    const authors = await prisma.author.findMany({
        where: {publicId: {in: authorIds}},
        select: {id: true}
    });
    if (authors.length !== authorIds.length) {
        logger.warn({authorIds}, "Create blocked: one or more authors not found");
        throw new AppError("One or more authors not found", 404);
    }

    const book = await prisma.book.create({
        data: {
            title,
            genre,
            publishDate,
            isbn,
            stock,
            authors: {
                create: authors.map(author => ({
                    author: {connect: {id: author.id}}
                }))
            }
        },
        include: {
            authors: {include: {author: true}}
        }
    });

    logger.info({bookId: book.publicId, title: book.title}, "Book created");
    return toBookResponse(book);
}

export async function updateBook(bookId, {title, genre, publishDate, isbn, stock, authorIds}) {
    const existingBook = await prisma.book.findUnique({where: {publicId: bookId}});
    if (!existingBook) {
        logger.warn({bookId}, "Update blocked: Book not found");
        throw new AppError("Book not found", 404);
    }

    if (isbn && isbn !== existingBook.isbn) {
        const isbnConflict = await prisma.book.findUnique({where: {isbn}});
        if (isbnConflict) {
            logger.warn({isbn}, "Update blocked: ISBN already in use by another book");
            throw new AppError("ISBN already in use", 400);
        }
    }

    let validAuthors = null;
    if (authorIds !== undefined) {
        validAuthors = await prisma.author.findMany({
            where: {publicId: {in: authorIds}},
            select: {id: true}
        });
        if (validAuthors.length !== authorIds.length) {
            logger.warn({authorIds}, "Update blocked: one or more authors not found");
            throw new AppError("One or more authors not found", 404);
        }
    }

    const data = {}
    if (title !== undefined) data.title = title;
    if (genre !== undefined) data.genre = genre;
    if (publishDate !== undefined) data.publishDate = publishDate;
    if (isbn !== undefined) data.isbn = isbn;
    if (stock !== undefined) data.stock = stock;
    if (validAuthors !== null) {
        data.authors = {
            deleteMany: {},
            create: validAuthors.map(author => ({
                author: {connect: {id: author.id}}
            }))
        };
    }

    const updatedBook = await prisma.book.update({
        where: {publicId: bookId},
        data,
        include: {authors: {include: {author: true}}}
    });

    logger.info({bookId: updatedBook.publicId, title: updatedBook.title}, "Book updated");
    return toBookResponse(updatedBook);
}

export async function deleteBook(bookId) {
    const existingBook = await prisma.book.findUnique({where: {publicId: bookId}});
    if (!existingBook) {
        logger.warn({bookId}, "Delete blocked: Book not found");
        throw new AppError("Book not found", 404);
    }

    const deletedBook = await prisma.book.delete({
        where: {publicId: bookId},
        include: {authors: {include: {author: true}}}
    });

    logger.info({bookId: deletedBook.publicId, title: deletedBook.title}, "Book deleted");
    return toBookResponse(deletedBook);
}

export async function getAllBooks({page, size, sort, order, search} = {}) {
    const safePage = Math.max(Number(page) || DEFAULT_PAGE, 1);
    const safeSize = Math.min(Math.max(Number(size) || DEFAULT_SIZE, 1), MAX_SIZE);
    const safeSort = ALLOWED_SORT.includes(sort) ? sort : "title";
    const safeOrder = order === "desc" ? "desc" : "asc";

    const skip = (safePage - 1) * safeSize;

    const where = search
        ? {title: {contains: search, mode: "insensitive"}}
        : {};

    const [books, total] = await Promise.all([
        prisma.book.findMany({
            where,
            skip,
            take: safeSize,
            orderBy: {[safeSort]: safeOrder},
        }),
        prisma.book.count({where}),
    ]);

    logger.info({count: books.length, page: safePage, total}, "Books listed");

    return {
        data: books.map(toBookResponse),
        meta: {
            page: safePage,
            size: safeSize,
            total,
            totalPages: Math.ceil(total / safeSize),
        },
    };
}

export async function getBookByPublicId(publicId) {
    const book = await prisma.book.findUnique({where: {publicId}});

    if (!book) {
        logger.warn({publicId}, "Read blocked: Book not found");
        throw new AppError("Book not found", 404);
    }

    return toBookResponse(book);
}