import request from 'supertest';
import {describe, expect, test} from 'vitest';

import app from '../../../src/app.js';

describe('GET /api/v1/actuator/info', () => {
    test('should return 200', async () => {
        const res = await request(app).get('/api/v1/actuator/info');

        expect(res.status).toBe(200);
    });

    test('should have name, version and description', async () => {
        const res = await request(app).get('/api/v1/actuator/info');

        expect(res.body.app).toHaveProperty('name');
        expect(res.body.app).toHaveProperty('version');
        expect(res.body.app).toHaveProperty('description');
    });
});