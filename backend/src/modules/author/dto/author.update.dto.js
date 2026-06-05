export function toAuthorUpdate(body) {
    return {
        name: body.name,
        bio: body.bio
    }
}