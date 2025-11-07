import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { CitizenEndpoints } from "./api/citizen";
import { handler } from "./rbmq/document";
import { OperatorsEndpoints } from "./api/operators";
import { httpRequests, httpDuration, register } from "./prometheus/logs";

handler().catch(console.error);

export const api = new Elysia({ prefix: "/api" })
  .use(openapi())
  .use(CitizenEndpoints)
  .use(OperatorsEndpoints);

const app = new Elysia()
  .use(api)
  .decorate({ store: { startTime: 0} })
  // Record request start time
  .onRequest(({ store }) => {
    store = { startTime: performance.now() };
  })
  // Measure and record metrics after the response
  .onAfterResponse(({ request, set, store }) => {
    const route = new URL(request.url).pathname;
    const duration = (performance.now() - store.startTime) / 1000; // seconds
    const status = set?.status ?? 200;

    httpRequests.inc({
      method: request.method,
      route,
      status,
    });

    httpDuration.observe(
      { route, method: request.method, status },
      duration
    );
  })
  // Expose metrics endpoint
  .get("/metrics", async () => {
    return new Response(await register.metrics(), {
      headers: { "Content-Type": register.contentType },
    });
  })
  .get("/health", async () => "healthy")
  .listen(3000);

export type App = typeof app;

console.log("🚀 Elysia server running at http://localhost:3000");
