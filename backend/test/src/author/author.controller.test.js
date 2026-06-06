import {beforeEach, describe, vi} from "vitest";

vi.mock("../../../src/modules/author/author.service.js", () => ({
    createAuthor: vi.fn(),
    updateAuthor: vi.fn(),
    deleteAuthor: vi.fn(),
    getAllAuthors: vi.fn(),
    getAuthorByPublicId: vi.fn(),
}));

vi.mock("../../../src/modules/author/dto/author.create.dto.js", () => ({
    toAuthorCreate: vi.fn((body) => body),
}));
vi.mock("../../../src/modules/author/dto/author.update.dto.js", () => ({
    toAuthorUpdate: vi.fn((body) => body),
}));
vi.mock("../../../src/shared/logger/logger.js", () => ({
    logger: {info: vi.fn(), warn: vi.fn(), error: vi.fn()},
}));

import * as authorService from "../../../src/modules/author/author.service.js";
import * as authorController from "../../../src/modules/author/author.controller.js";

function mockResponse() {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
}

describe('Author controller createAuthor', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should respond 201 with the created author", async () => {

    });

    it("should call next(error) when the service throws", async () => {

    });

});

describe('Author controller getAuthorByPublicId', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should respond 200 with the author", async () => {

    });

    it("should call next(error) when service throws", async () => {

    });
});

describe('Author controller getAllAuthors', () => {
    beforeEach(() => vi.clearAllMocks());

    it("should pass query params to the service", async () => {

    });
});