import prisma from "../../../../prisma/prisma.client.js";
import {logger} from "../../../shared/logger/logger.js";
import {AppError} from "../../../shared/errors/AppError.js";
import {toAuthorDetailResponse, toAuthorResponse,} from "../dto/author.response.dto.js";

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;
const MAX_SIZE = 100;
const ALLOWED_SORT = ["publicId", "name", "createdAt", "updatedAt"];

export async function createAuthor({name, bio}) {
    try {
        const author = await prisma.author.create({
            data: {name, bio},
        });

        logger.info(
            {authorId: author.publicId, name: author.name},
            "Author created",
        );
        return toAuthorResponse(author);
    } catch (error) {
        if (error.code === "P2002") {
            logger.warn({name}, "Create blocked: Author name already exists");
            throw new AppError("Author already exists", 409);
        }
        throw error;
    }
}

export async function updateAuthor(authorId, {name, bio}) {
    const data = {};
    if (name !== undefined) data.name = name;
    if (bio !== undefined) data.bio = bio;

    try {
        const updatedAuthor = await prisma.author.update({
            where: {publicId: authorId},
            data,
        });

        logger.info(
            {authorId: updatedAuthor.publicId, name: updatedAuthor.name},
            "Author updated",
        );
        return toAuthorResponse(updatedAuthor);
    } catch (error) {
        if (error.code === "P2025") {
            logger.warn({authorId}, "Update blocked: Author not found");
            throw new AppError("Author not found", 404);
        }
        if (error.code === "P2002") {
            logger.warn(
                {authorId, name},
                "Update blocked: Author name already exists",
            );
            throw new AppError("Author name already exists", 409);
        }
        throw error;
    }
}

export async function deleteAuthor(authorId) {
    try {
        const deletedAuthor = await prisma.author.delete({
            where: {publicId: authorId},
        });

        logger.info(
            {authorId: deletedAuthor.publicId, name: deletedAuthor.name},
            "Author deleted",
        );
        return toAuthorResponse(deletedAuthor);
    } catch (error) {
        if (error.code === "P2025") {
            logger.warn(
                {authorId},
                "Delete blocked: Author not found"
            );
            throw new AppError("Author not found", 404);
        }
        throw error;
    }
}

export async function getAllAuthors({
                                        page,
                                        size,
                                        sort,
                                        order,
                                        search,
                                    } = {}) {
    const safePage = Math.max(Number(page) || DEFAULT_PAGE, 1);
    const safeSize = Math.min(
        Math.max(Number(size) || DEFAULT_SIZE, 1),
        MAX_SIZE,
    );
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

    logger.info(
        {count: authors.length, page: safePage, total},
        "Authors listed",
    );

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
    const author = await prisma.author.findUnique({
        where: {publicId},
        include: {
            books: {
                include: {book: true},
            },
        },
    });

    if (!author) {
        logger.warn({publicId}, "Read blocked: Author not found");
        throw new AppError("Author not found", 404);
    }

    return toAuthorDetailResponse(author);
}