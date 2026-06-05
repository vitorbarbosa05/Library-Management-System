export function toBookUpdate(body) {
    const data = {};

    if (body.title !== undefined) data.title = body.title.trim();
    if (body.genre !== undefined) data.genre = body.genre.trim();
    if (body.publishDate !== undefined) data.publishDate = new Date(body.publishDate);
    if (body.isbn !== undefined) data.isbn = body.isbn.trim();
    if (body.stock !== undefined) data.stock = body.stock;
    if (body.authorIds !== undefined) data.authorIds = body.authorIds;

    return data;
}