import { beforeEach, describe, expect, it, vi } from "vitest";
import * as authorService from "../../../../../src/modules/author/service/author.service.js";
import * as authorController from "../../../../../src/modules/author/controller/author.controller.js";

vi.mock("../../../../../src/modules/author/service/author.service.js", () => ({
    createAuthor: vi.fn(),
    updateAuthor: vi.fn(),
    deleteAuthor: vi.fn(),
    getAllAuthors: vi.fn(),
    getAuthorByPublicId: vi.fn(),
}));

vi.mock("../../../../../src/modules/author/dto/author.create.dto.js", () => ({
    toAuthorCreate: vi.fn((body) => body),
}));
vi.mock("../../../../../src/modules/author/dto/author.update.dto.js", () => ({
    toAuthorUpdate: vi.fn((body) => body),
}));

function mockResponse() {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
}

describe("Author controller createAuthor", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should respond 201 with the created author", async () => {
        const req = { body: { name: "Murakami", bio: "Writer" } };
        const res = mockResponse();
        const next = vi.fn();

        const fakeResult = { publicId: "uuid-123", name: "Murakami", bio: "Writer" };
        authorService.createAuthor.mockResolvedValue(fakeResult);

        await authorController.createAuthor(req, res, next);

        expect(authorService.createAuthor).toHaveBeenCalledWith({
            name: "Murakami",
            bio: "Writer",
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Author created successfully",
            data: fakeResult,
        });
        expect(next).not.toHaveBeenCalled();
    });

    it("should call next(error) when the service throws", async () => {
        const req = { body: { name: "Murakami" } };
        const res = mockResponse();
        const next = vi.fn();

        const error = new Error("Author already exists");
        authorService.createAuthor.mockRejectedValue(error);

        await authorController.createAuthor(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
    });
});

describe("Author controller updateAuthor", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should respond 200 with the updated author", async () => {
        const req = { params: { id: "uuid-123" }, body: { bio: "New bio" } };
        const res = mockResponse();
        const next = vi.fn();

        const fakeResult = { publicId: "uuid-123", bio: "New bio" };
        authorService.updateAuthor.mockResolvedValue(fakeResult);

        await authorController.updateAuthor(req, res, next);

        expect(authorService.updateAuthor).toHaveBeenCalledWith("uuid-123", { bio: "New bio" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Author updated successfully",
            data: fakeResult,
        });
        expect(next).not.toHaveBeenCalled();
    });

    it("should call next(error) when service throws", async () => {
        const req = { params: { id: "missing" }, body: {} };
        const res = mockResponse();
        const next = vi.fn();

        const error = new Error("Author not found");
        authorService.updateAuthor.mockRejectedValue(error);

        await authorController.updateAuthor(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

describe("Author controller deleteAuthor", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should respond 200 when deleted", async () => {
        const req = { params: { id: "uuid-123" } };
        const res = mockResponse();
        const next = vi.fn();

        const fakeResult = { publicId: "uuid-123" };
        authorService.deleteAuthor.mockResolvedValue(fakeResult);

        await authorController.deleteAuthor(req, res, next);

        expect(authorService.deleteAuthor).toHaveBeenCalledWith("uuid-123");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Author deleted successfully",
            data: fakeResult,
        });
    });

    it("should call next(error) when service throws", async () => {
        const req = { params: { id: "missing" } };
        const res = mockResponse();
        const next = vi.fn();

        const error = new Error("Author not found");
        authorService.deleteAuthor.mockRejectedValue(error);

        await authorController.deleteAuthor(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

describe("Author controller getAuthorByPublicId", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should respond 200 with the author", async () => {
        const req = { params: { id: "uuid-123" } };
        const res = mockResponse();
        const next = vi.fn();

        const fakeResult = { publicId: "uuid-123", name: "Murakami" };
        authorService.getAuthorByPublicId.mockResolvedValue(fakeResult);

        await authorController.getAuthorByPublicId(req, res, next);

        expect(authorService.getAuthorByPublicId).toHaveBeenCalledWith("uuid-123");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Author found successfully",
            data: fakeResult,
        });
    });

    it("should call next(error) when service throws", async () => {
        const req = { params: { id: "missing" } };
        const res = mockResponse();
        const next = vi.fn();

        const error = new Error("Author not found");
        authorService.getAuthorByPublicId.mockRejectedValue(error);

        await authorController.getAuthorByPublicId(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

describe("Author controller getAllAuthors", () => {
    beforeEach(() => vi.clearAllMocks());

    it("should pass query params to the service and return paginated result directly", async () => {
        const req = {
            query: { page: "2", size: "5", sort: "name", order: "desc", search: "mura" },
        };
        const res = mockResponse();
        const next = vi.fn();

        const fakeResult = {
            data: [{ publicId: "uuid-1", name: "Murakami" }],
            meta: { page: 2, size: 5, total: 1, totalPages: 1 },
        };
        authorService.getAllAuthors.mockResolvedValue(fakeResult);

        await authorController.getAllAuthors(req, res, next);

        expect(authorService.getAllAuthors).toHaveBeenCalledWith({
            page: "2",
            size: "5",
            sort: "name",
            order: "desc",
            search: "mura",
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeResult);
    });

    it("should call next(error) when service throws", async () => {
        const req = { query: {} };
        const res = mockResponse();
        const next = vi.fn();

        const error = new Error("DB down");
        authorService.getAllAuthors.mockRejectedValue(error);

        await authorController.getAllAuthors(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});