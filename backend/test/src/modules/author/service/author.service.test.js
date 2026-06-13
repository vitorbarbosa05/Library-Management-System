import {beforeEach, describe, expect, it, vi} from "vitest";
import prisma from "../../../../../prisma/prisma.client.js";
import * as authorService from "../../../../../src/modules/author/service/author.service.js";

vi.mock("../../../../../prisma/prisma.client.js", () => ({
    default: {
        author: {
            findUnique: vi.fn(),
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            count: vi.fn(),
        },
    },
}));

vi.mock("../../../../../src/shared/logger/logger.js", () => ({
    logger: {info: vi.fn(), warn: vi.fn(), error: vi.fn()},
}));

// Helper to build Prisma-shaped errors
function prismaError(code, message = "Prisma error") {
    const err = new Error(message);
    err.code = code;
    return err;
}

const fakeAuthor = {
    id: 1,
    publicId: "uuid-123",
    name: "Haruki Murakami",
    bio: "Japanese writer",
    createdAt: new Date(),
    updatedAt: new Date(),
};

const fakeAuthorWithBooks = {
    ...fakeAuthor,
    books: [
        {
            book: {publicId: "book-uuid-1", title: "Norwegian Wood"},
        },
    ],
};

describe("POST /api/v1/author", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should create an author", async () => {
        prisma.author.create.mockResolvedValue(fakeAuthor);

        const result = await authorService.createAuthor({
            name: "Haruki Murakami",
            bio: "Japanese writer",
        });

        expect(prisma.author.create).toHaveBeenCalledWith({
            data: {name: "Haruki Murakami", bio: "Japanese writer"},
        });
        expect(result.publicId).toBe("uuid-123");
        expect(result.name).toBe("Haruki Murakami");
    });

    it("should throw 409 when Prisma rejects with P2002 (duplicate name)", async () => {
        prisma.author.create.mockRejectedValue(prismaError("P2002"));

        await expect(
            authorService.createAuthor({name: "Haruki Murakami"}),
        ).rejects.toThrow("Author already exists");
    });

    it("should re-throw unknown errors", async () => {
        const unknown = new Error("connection lost");
        prisma.author.create.mockRejectedValue(unknown);

        await expect(
            authorService.createAuthor({name: "Anyone"}),
        ).rejects.toThrow("connection lost");
    });
});

describe("PATCH /api/v1/author/:id", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should update and return the DTO", async () => {
        prisma.author.update.mockResolvedValue({
            ...fakeAuthor,
            bio: "Updated bio",
        });

        const result = await authorService.updateAuthor("uuid-123", {
            bio: "Updated bio",
        });

        expect(prisma.author.update).toHaveBeenCalledOnce();
        expect(result.bio).toBe("Updated bio");
        expect(result.publicId).toBe("uuid-123");
    });

    it("should only include provided fields in update data", async () => {
        prisma.author.update.mockResolvedValue(fakeAuthor);

        await authorService.updateAuthor("uuid-123", {bio: "Only bio"});

        const updateArg = prisma.author.update.mock.calls[0][0];
        expect(updateArg.data).toEqual({bio: "Only bio"});
        expect(updateArg.where).toEqual({publicId: "uuid-123"});
    });

    it("should throw 404 when Prisma rejects with P2025", async () => {
        prisma.author.update.mockRejectedValue(prismaError("P2025"));

        await expect(
            authorService.updateAuthor("missing-value", {bio: "none"}),
        ).rejects.toThrow("Author not found");
    });

    it("should throw 409 when Prisma rejects with P2002 (duplicate name on update)", async () => {
        prisma.author.update.mockRejectedValue(prismaError("P2002"));

        await expect(
            authorService.updateAuthor("uuid-123", {name: "Existing"}),
        ).rejects.toThrow("Author name already exists");
    });
});

describe("DELETE /api/v1/author/:id", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should delete an author", async () => {
        prisma.author.delete.mockResolvedValue(fakeAuthor);

        const result = await authorService.deleteAuthor("uuid-123");

        expect(prisma.author.delete).toHaveBeenCalledWith({
            where: {publicId: "uuid-123"},
        });
        expect(result.publicId).toBe("uuid-123");
    });

    it("should throw 404 when Prisma rejects with P2025", async () => {
        prisma.author.delete.mockRejectedValue(prismaError("P2025"));

        await expect(
            authorService.deleteAuthor("missing"),
        ).rejects.toThrow("Author not found");
    });
});

describe("GET /api/v1/author/", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should return paginated data with meta", async () => {
        prisma.author.findMany.mockResolvedValue([fakeAuthor]);
        prisma.author.count.mockResolvedValue(1);

        const result = await authorService.getAllAuthors({page: 1, size: 10});

        expect(result.data).toHaveLength(1);
        expect(result.data[0].publicId).toBe("uuid-123");
        expect(result.meta).toEqual({
            page: 1,
            size: 10,
            total: 1,
            totalPages: 1,
        });
    });

    it("should apply search filter when provided", async () => {
        prisma.author.findMany.mockResolvedValue([]);
        prisma.author.count.mockResolvedValue(0);

        await authorService.getAllAuthors({search: "murakami"});

        const findManyArg = prisma.author.findMany.mock.calls[0][0];
        expect(findManyArg.where).toEqual({
            name: {contains: "murakami", mode: "insensitive"},
        });
    });

    it("should clamp size to MAX_SIZE", async () => {
        prisma.author.findMany.mockResolvedValue([]);
        prisma.author.count.mockResolvedValue(0);

        const result = await authorService.getAllAuthors({size: 9999});

        expect(result.meta.size).toBe(100);
    });

    it("should fall back to default sort when sort is invalid", async () => {
        prisma.author.findMany.mockResolvedValue([]);
        prisma.author.count.mockResolvedValue(0);

        await authorService.getAllAuthors({sort: "password"});

        const findManyArg = prisma.author.findMany.mock.calls[0][0];
        expect(findManyArg.orderBy).toEqual({name: "asc"});
    });
});

describe("GET /api/v1/author/:id", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should return the author with books included", async () => {
        prisma.author.findUnique.mockResolvedValue(fakeAuthorWithBooks);

        const result = await authorService.getAuthorByPublicId("uuid-123");

        expect(prisma.author.findUnique).toHaveBeenCalledWith({
            where: {publicId: "uuid-123"},
            include: {books: {include: {book: true}}},
        });
        expect(result.publicId).toBe("uuid-123");
        expect(result.books).toHaveLength(1);
        expect(result.books[0]).toEqual({
            publicId: "book-uuid-1",
            title: "Norwegian Wood",
        });
    });

    it("should throw 404 when author not found", async () => {
        prisma.author.findUnique.mockResolvedValue(null);

        await expect(
            authorService.getAuthorByPublicId("missing-value"),
        ).rejects.toThrow("Author not found");

        expect(prisma.author.findUnique).toHaveBeenCalledOnce();
    });
});