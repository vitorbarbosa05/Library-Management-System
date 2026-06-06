import {describe, it, expect, vi, beforeEach} from "vitest";

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

import prisma from "../../../prisma/prisma.client.js";
import * as authorService from "../../../src/modules/author/author.service.js";

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

        await expect(
            authorService.createAuthor({name: "Haruki Murakami"})
        ).rejects.toThrow("Author already exists");

        expect(prisma.author.create).not.toHaveBeenCalled();
    });
});

describe('PATCH /api/v1/author/:id', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should update a author", async () => {

    })

    it("should only include provided fields in update data", async () => {

    });

    it("should throw 404 when author not found", async () => {

    });
});

describe('DELETE /api/v1/author/:id', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should delete a author", async () => {
    })

    it("should only include provided fields in update data", async () => {

    });

    it("should throw 404 when author not found", async () => {

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

    });
});

describe('GET /api/v1/author/:id', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should return the author DTO when found", async () => {
    })

    it("should throw 404 when author not found", async () => {

    });
});