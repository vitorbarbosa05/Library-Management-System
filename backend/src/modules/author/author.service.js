import prisma from "../../../prisma/prisma.client.js";
import {logger} from "../../shared/logger/logger.js";
import {AppError} from "../../shared/errors/AppError.js";
import {toAuthorResponse} from "./dto/author.response.dto.js";

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;
const MAX_SIZE = 100;
const ALLOWED_SORT = ["id", "name", "createdAt", "updatedAt"];

export async function createAuthor({name, bio}) {
    const existingAuthor = await prisma.author.findFirst({where: {name}});
    if (existingAuthor) {
        logger.warn({name}, "Create blocked: Author already exists");
        throw new AppError("Author already exists", 409);
    }

    const author = await prisma.author.create({
        data: {
            name,
            bio
        },
        include: {
            books: {
                include: {
                    book: true
                }
            }
        }
    });

    logger.info({authorId: author.publicId, name: author.name}, "Author created");
    return toAuthorResponse(author);
}

export async function updateAuthor(authorId, {name, bio}) {
    const existingAuthor = await prisma.author.findUnique({where: {publicId: authorId}});
    if (!existingAuthor) {
        logger.warn({authorId}, "Update blocked: Author not found");
        throw new AppError("Author not found", 404);
    }

    const data = {}
    if (name !== undefined) data.name = name;
    if (bio !== undefined) data.bio = bio;

    const updatedAuthor = await prisma.author.update({
        where: {publicId: authorId},
        data,
        include: {
            books: {
                include: {
                    book: true
                }
            }
        }
    });

    logger.info({authorId: updatedAuthor.publicId, name: updatedAuthor.name}, "Author updated");
    return toAuthorResponse(updatedAuthor);
}

export async function deleteAuthor(authorId) {
    const existingAuthor = await prisma.author.findUnique({where: {publicId: authorId}});
    if (!existingAuthor) {
        logger.warn({authorId}, "Delete blocked: Author not found");
        throw new AppError("Author not found", 404);
    }

    const deletedAuthor = await prisma.author.delete({
        where: {publicId: authorId},
        include: {
            books: {
                include: {
                    book: true
                }
            }
        }
    });

    logger.info({authorId: deletedAuthor.publicId, name: deletedAuthor.name}, "Author deleted");
    return toAuthorResponse(deletedAuthor);
}

export async function getAllAuthors({page, size, sort, order, search} = {}) {
    const safePage = Math.max(Number(page) || DEFAULT_PAGE, 1);
    const safeSize = Math.min(Math.max(Number(size) || DEFAULT_SIZE, 1), MAX_SIZE);
    const safeSort = ALLOWED_SORT.includes(sort) ? sort : "name";
    const safeOrder = order === "desc" ? "desc" : "asc";

    const skip = (safePage - 1) * safeSize;

    const where = search
        ? {name: {contains: search, mode: "insensitive"}}
        : {};

    const [authors, total] = await Promise.all([
        prisma.author.findMany({
            where,
            skip,
            take: safeSize,
            orderBy: {[safeSort]: safeOrder},
        }),
        prisma.author.count({where}),
    ]);

    logger.info({count: authors.length, page: safePage, total}, "Authors listed");

    return {
        data: authors.map(toAuthorResponse),
        meta: {
            page: safePage,
            size: safeSize,
            total,
            totalPages: Math.ceil(total / safeSize),
        },
    };
}

export async function getAuthorByPublicId(publicId) {
    const author = await prisma.author.findUnique({where: {publicId},});

    if (!author) {
        logger.warn({publicId}, "Read blocked: Author not found");
        throw new AppError("Author not found", 404);
    }

    return toAuthorResponse(author);
}