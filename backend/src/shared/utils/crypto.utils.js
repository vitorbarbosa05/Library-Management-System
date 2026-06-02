import crypto from "node:crypto";

export const hashEmail = (email) => {
    if (!email) return "";
    return crypto.createHash("sha256")
        .update(email.trim().toLowerCase())
        .digest("hex");
}