export function toBookCreate(body) {
    return {
        title: body.title.trim(),
        genre: body.genre.trim(),
        publishDate: new Date(body.publishDate),
        isbn: body.isbn.trim(),
        stock: body.stock,
        authorIds: body.authorIds
    };
}