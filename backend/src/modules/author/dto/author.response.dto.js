export function toAuthorResponse(author) {
    return {
        publicId: author.publicId,
        name: author.name,
        bio: author.bio,
        createdAt: author.createdAt,
        updatedAt: author.updatedAt,
    };
}

export function toAuthorDetailResponse(author) {
    return {
        publicId: author.publicId,
        name: author.name,
        bio: author.bio,
        createdAt: author.createdAt,
        updatedAt: author.updatedAt,
        books:
            author.books?.map(({ book }) => ({
                publicId: book.publicId,
                title: book.title,
            })) ?? [],
    };
}