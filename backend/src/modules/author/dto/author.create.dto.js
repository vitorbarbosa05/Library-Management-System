export function toAuthorCreate(body) {
    return {
        name: body.name,
        bio: body.bio
    }
}