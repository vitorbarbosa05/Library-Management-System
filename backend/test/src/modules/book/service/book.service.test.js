import {beforeEach, describe, it, vi} from "vitest";

vi.mock("../../../../../prisma/prisma.client.js", () => ({
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

vi.mock("../../../../../src/shared/logger/logger.js", () => ({
    logger: {info: vi.fn(), warn: vi.fn(), error: vi.fn()},
}));

describe('POST /api/v1/book', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should create a book", async () => {

    })
});