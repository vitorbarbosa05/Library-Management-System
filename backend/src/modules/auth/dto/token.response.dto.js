export function toTokenResponse(token) {
    return {
        accessToken: token,
        tokenType: "Bearer",
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    };
}