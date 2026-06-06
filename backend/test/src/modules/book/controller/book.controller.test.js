import {beforeEach, describe, expect, it, vi} from "vitest";
import * as bookService from "../../../../../src/modules/book/service/book.service.js";
import * as bookController from "../../../../../src/modules/book/controller/book.controller.js";

vi.mock("../../../../../src/modules/book/service/book.service.js", () => ({
    createBook: vi.fn(),
    updateBook: vi.fn(),
    deleteBook: vi.fn(),
    getAllBooks: vi.fn(),
    getBookByPublicId: vi.fn(),
}));

vi.mock("../../../../../src/modules/book/dto/book.create.dto.js", () => ({
    toBookCreate: vi.fn((body) => body),
}));
vi.mock("../../../../../src/modules/book/dto/book.update.dto.js", () => ({
    toBookUpdate: vi.fn((body) => body),
}));

function mockResponse() {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
}

describe("Book controller createBook", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should respond 201 with the created book", async () => {

    });
});