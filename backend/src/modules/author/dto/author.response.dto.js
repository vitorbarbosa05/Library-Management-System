export function toAuthorResponse(author) {
    return {
        id: author.publicId,
        name: author.name,
        bio: author.bio,
        books: author.books,
        createdAt: author.createdAt,
        updatedAt: author.updatedAt,
    }
}