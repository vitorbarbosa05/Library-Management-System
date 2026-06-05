export function toUserResponse(user) {
    return {
        id: user.publicId,
        name: user.name,
        email: user.email,
        role: user.role,
        memberShipStatus: user.memberShipStatus
    };
}