import {toAuthorResponse} from "../../author/dto/author.response.dto.js";

export function toBookResponse(book) {
    return {
        id: book.publicId,
        title: book.title,
        genre: book.genre,
        publishDate: book.publishDate,
        isbn: book.isbn,
        stock: book.stock,
        authors: book.authors?.map(authorOnBooks => toAuthorResponse(authorOnBooks.author)) ?? [],
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
    }
}