import { Elysia } from "elysia";
import { openapi } from '@elysiajs/openapi';
import { CitizenEndpoints } from "./api/citizen";
import { handler } from "./rbmq/document";
import { OperatorsEndpoints } from "./api/operators";

handler().catch(console.error);

export const app = new Elysia({ prefix: '/api' })
  .use(openapi())
  .use(CitizenEndpoints)
  .use(OperatorsEndpoints)
  .listen(8080);

export type App = typeof app;

console.log("Elysia server running at http://localhost:8080");
