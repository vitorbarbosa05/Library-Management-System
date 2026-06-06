import {beforeEach, describe, expect, it, vi} from "vitest";
import prisma from "../../../prisma/prisma.client.js";
import * as authorService from "../../../src/modules/author/author.service.js";

vi.mock("../../../prisma/prisma.client.js", () => ({
    default: {
        author: {
            findFirst: vi.fn(),
            findUnique: vi.fn(),
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            count: vi.fn(),
        },
    },
}));

vi.mock("../../../src/shared/logger/logger.js", () => ({
    logger: {info: vi.fn(), warn: vi.fn(), error: vi.fn()},
}));

const fakeAuthor = {
    id: 1,
    publicId: "uuid-123",
    name: "Haruki Murakami",
    bio: "Japanese writer",
    createdAt: new Date(),
    updatedAt: new Date(),
};

describe('POST /api/v1/author', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should create a author", async () => {
        prisma.author.findFirst.mockResolvedValue(null);
        prisma.author.create.mockResolvedValue(fakeAuthor);

        const result = await authorService.createAuthor({
            name: "Haruki Murakami",
            bio: "Japanese writer",
        });

        expect(prisma.author.findFirst).toHaveBeenCalledWith({
            where: {name: "Haruki Murakami"},
        });
        expect(prisma.author.create).toHaveBeenCalledOnce();
        expect(result.id).toBe("uuid-123");
        expect(result.name).toBe("Haruki Murakami");
    })

    it("should throw 409 if author name already exists", async () => {
        prisma.author.findFirst.mockResolvedValue(fakeAuthor);

        await expect(authorService.createAuthor({name: "Haruki Murakami"}))
            .rejects.toThrow("Author already exists");

        expect(prisma.author.create).not.toHaveBeenCalled();
    });
});

describe('PATCH /api/v1/author/:id', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should update and return the DTO", async () => {
        prisma.author.findUnique.mockResolvedValue(fakeAuthor);
        prisma.author.update.mockResolvedValue({...fakeAuthor, bio: "Updated bio"});

        const result = await authorService.updateAuthor("uuid-123", {bio: "Updated bio"});

        expect(prisma.author.update).toHaveBeenCalledOnce();
        expect(result.bio).toBe("Updated bio");
    });

    it("should only include provided fields in update data", async () => {
        prisma.author.findUnique.mockResolvedValue(fakeAuthor);
        prisma.author.update.mockResolvedValue(fakeAuthor);

        await authorService.updateAuthor("uuid-123", {bio: "Only bio"});

        const updateArg = prisma.author.update.mock.calls[0][0];
        expect(updateArg.data).toEqual({bio: "Only bio"});
    });

    it("should throw 404 when author not found", async () => {
        prisma.author.findUnique.mockResolvedValue(null);

        await expect(authorService.updateAuthor("missing-value", {bio: "none"}))
            .rejects.toThrow("Author not found");

        expect(prisma.author.update).not.toHaveBeenCalled();
    });
});

describe('DELETE /api/v1/author/:id', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should delete a author", async () => {
        prisma.author.findUnique.mockResolvedValue(fakeAuthor);
        prisma.author.delete.mockResolvedValue(fakeAuthor);

        const result = await authorService.deleteAuthor("uuid-123");

        expect(prisma.author.delete).toHaveBeenCalledWith({
            where: {publicId: "uuid-123"},
            include: {books: {include: {book: true}}},
        });
        expect(result.id).toBe("uuid-123");
    })

    it("should throw 404 when author not found", async () => {
        prisma.author.findUnique.mockResolvedValue(null);

        await expect(authorService.deleteAuthor("missing")
        ).rejects.toThrow("Author not found");

        expect(prisma.author.delete).not.toHaveBeenCalled();
    });
});

describe('GET /api/v1/author/', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should return paginated data with meta", async () => {
    })

    it("should apply search filter when provided", async () => {

    });

    it("should clamp size to MAX_SIZE", async () => {

    });

    it("should fall back to default sort when sort is invalid", async () => {
        prisma.author.findMany.mockResolvedValue([]);
        prisma.author.count.mockResolvedValue(0);

        await authorService.getAllAuthors({sort: "password"});

        const findManyArg = prisma.author.findMany.mock.calls[0][0];
        expect(findManyArg.orderBy).toEqual({name: "asc"});
    });
});

describe('GET /api/v1/author/:id', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should return the author", async () => {
        prisma.author.findUnique.mockResolvedValue(fakeAuthor);

        const result = await authorService.getAuthorByPublicId("uuid-123");

        expect(prisma.author.findUnique).toHaveBeenCalledWith({
            where: {publicId: "uuid-123"},
        });
        expect(result.id).toBe("uuid-123");
    })

    it("should throw 404 when author not found", async () => {
        prisma.author.findUnique.mockResolvedValue(null);

        await expect(authorService.deleteAuthor("missing-value"))
            .rejects.toThrow("Author not found");

        expect(prisma.author.delete).not.toHaveBeenCalled();
    });
});