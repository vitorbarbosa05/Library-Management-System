import { z } from "zod";

export const MAX_BIO_LENGTH = 200;

export const authorFormSchema = z.object({
    name: z.string().trim().min(1, "Author name is required"),
    bio: z
        .string()
        .trim()
        .max(MAX_BIO_LENGTH, `Bio max ${MAX_BIO_LENGTH} characters`)
        .optional()
        .or(z.literal("").transform(() => undefined)),
});

export type AuthorFormValues = z.infer<typeof authorFormSchema>;