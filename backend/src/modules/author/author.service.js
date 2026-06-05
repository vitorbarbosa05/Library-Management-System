import prisma from "../../../prisma/prisma.client.js";
import {logger} from "../../shared/logger/logger.js";
import {AppError} from "../../shared/errors/AppError.js";
import {toAuthorResponse} from "./dto/author.response.dto.js";

export async function createAuthor({name, bio}) {
    const existingAuthor = await prisma.author.findUnique({where: {name}});
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