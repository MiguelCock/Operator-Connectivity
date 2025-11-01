import { treaty } from '@elysiajs/eden'
import { describe, expect, it } from 'bun:test';
import { App } from '../src';

const client = treaty<App>('localhost:8080') 

describe('Citizen tests', () => {
    it('Citizen registered', async () => {
        const response = await client.api.citizen.post({
            id: 5421243214,
            name: "Carlos Andres Caro",
            address: "Cra 54 # 45 -67",
            email: "caro@mymail.com",
            operatorId: "65ca0a00d833e984e2608756",
            operatorName: "Operador Ciudadano",
        });

        expect(response.status).toBe(201);
    });
    it('Citizen validated', async () => {
        const response = await client.api.citizen.id({ id: 5421243214 }).get();

        expect(response.status).toBe(200);
    });
    it('Citizen unregistered', async () => {
        const response = await client.api.citizen.delete({
            id: 5421243214,
            operatorId: "65ca0a00d833e984e2608756",
            operatorName: "Operador Ciudadano",
        });

        expect(response.status).toBe(500);
    });
    it('Citizen not found', async () => {
        const response = await client.api.citizen.id({ id: 5421243214 }).get();

        expect(response.status).toBe(204);
    });
})