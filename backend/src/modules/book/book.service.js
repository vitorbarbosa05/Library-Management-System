import prisma from "../../../prisma/prisma.client.js";
import {logger} from "../../shared/logger/logger.js";
import {toBookResponse} from "./dto/book.response.dto.js";
import {AppError} from "../../shared/errors/AppError.js";

export async function create({title, genre, publishDate, isbn, stock, authorIds}) {
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

export async function update(bookId, title, genre, publishDate, isbn, stock, authorIds) {
    const existingBook = await prisma.book.findUnique({where: {id: bookId}});
    if (!existingBook) {
        logger.warn({isbn}, "Update blocked: Book not found");
        throw new AppError("Book not found", 404);
    }

    if (isbn && isbn !== existingBook.isbn) {
        const isbnConflict = await prisma.book.findUnique({where: {isbn}});
        if (isbnConflict) {
            logger.warn({isbn}, "Update blocked: ISBN already in use by another book");
            throw new AppError("ISBN already in use", 400);
        }
    }

    const validAuthors = await prisma.author.findMany({
        where: {publicId: {in: authorIds}},
        select: {id: true}
    });
    if (validAuthors.length !== authorIds.length) {
        logger.warn({authorIds}, "Update blocked: one or more authors not found");
        throw new AppError("One or more authors not found", 404);
    }

    const updatedBook = await prisma.book.update({
        where: {id: bookId},
        data: {
            title,
            genre,
            publishDate,
            isbn,
            stock,
            authors: {
                create: validAuthors.map(author => ({
                    author: {connect: {id: author.id}}
                }))
            }
        },
        include: {
            authors: {include: {author: true}}
        }
    });

    logger.info({bookId: updatedBook.publicId, title: updatedBook.title}, "Book updated");
    return toBookResponse(updatedBook);
}

export async function safeDelete(bookId) {

}