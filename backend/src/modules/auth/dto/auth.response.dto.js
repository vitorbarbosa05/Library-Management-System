import { toUserResponse } from "./user.response.dto.js";
import {toTokenResponse} from "./token.response.dto.js";

export function toAuthResponse(user, token) {
    return {
        user: toUserResponse(user),
        token: toTokenResponse(token)
    };
}