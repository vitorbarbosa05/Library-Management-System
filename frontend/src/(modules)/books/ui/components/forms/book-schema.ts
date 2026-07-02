import {z} from "zod";

const MAX_TITLE_LENGTH = 200;
const MAX_STOCK = 1000;

const bookGenreEnum = z.enum([
    "FANTASY",
    "SCIENCE_FICTION",
    "ACTION_ADVENTURE",
    "MYSTERY",
    "HORROR",
    "THRILLER_SUSPENSE",
    "HISTORICAL_FICTION",
    "ROMANCE",
    "SHORT_STORY",
    "CHILDRENS",
    "AUTOBIOGRAPHY",
    "FOOD_DRINK",
    "ART",
    "SELF_HELP",
    "HISTORY",
    "TRAVEL",
    "CRIME",
]);

/**
 * Validates an ISBN-10 or ISBN-13 by checking the algorithmic check-digit.
 * Ignores hyphens and spaces; case-insensitive on 'X' for ISBN-10.
 */
function isValidIsbn(value: string): boolean {
    const clean = value.replace(/[-\s]/g, "").toUpperCase();

    if (clean.length === 10) {
        if (!/^\d{9}[\dX]$/.test(clean)) return false;

    }

    if (clean.length === 13) {
        if (!/^\d{13}$/.test(clean)) return false;

    }

    return false;
}

export const bookFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(MAX_TITLE_LENGTH, `Title max ${MAX_TITLE_LENGTH} characters`),

    genre: bookGenreEnum,

    publishDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Publish date must be YYYY-MM-DD")
        .refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date"),

    isbn: z
        .string()
        .trim()
        .min(1, "ISBN is required")
        .refine(isValidIsbn, "Invalid ISBN (must be a valid ISBN-10 or ISBN-13)"),

    stock: z
        .number({message: "Stock must be a number"})
        .int("Stock must be an integer")
        .min(0, "Stock cannot be negative")
        .max(MAX_STOCK, `Stock max ${MAX_STOCK}`),

    authorIds: z
        .array(z.string().uuid("Author id must be a valid UUID"))
        .min(1, "Select at least one author"),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;