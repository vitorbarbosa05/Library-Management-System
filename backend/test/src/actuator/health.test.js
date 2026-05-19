import request from "supertest";
import {describe, expect, test} from "vitest";

import app from "../../../src/app.js";

describe('GET /api/v1/actuator/health', () => {
    test('should return 200', async () => {
        const res = await request(app).get('/api/v1/actuator/health');

        expect(res.status).toBe(200);
    });

    test('should have status UP', async () => {
        const res = await request(app).get('/api/v1/actuator/health');

        expect(res.body).toHaveProperty('status', 'UP');
    });

    test('should have timestamp in ISO format', async () => {
        const res = await request(app).get('/api/v1/actuator/health');

        expect(res.body).toHaveProperty('timestamp');
        expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
    });
});