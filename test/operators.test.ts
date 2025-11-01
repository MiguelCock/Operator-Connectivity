import { treaty } from '@elysiajs/eden'
import { describe, expect, it } from 'bun:test';
import { App } from '../src';

const client = treaty<App>('localhost:8080') 

describe('Operators tests', () => {
    it('Get operators', async () => {
        const response = await client.api.operators.get();

        expect(response.status).toBe(200);
    });
})