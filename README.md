# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:8080/ with your browser to see the result.


.post("/v1/lookup", async (c) => {
    return "lookup";
  }, {
    body: Job
  })
  .post("/v1/register-citizen", async (c) => {
    return "register-citizen";
  })
  .post("/v1/unregister-citizen", async (c) => {
    return "unregister-citizen";
  })
  .post("/v1/register-operator", async (c) => {
    return "register-operator";
  })
  .post("/v1/transfer", async (c) => {
    return "transfer";
  })
  .post("/v1/delete", async (c) => {
    return "delete";
  })
  // Admin endpoints
  .get("/v1/jobs", () => "jobs")
  .get("/v1/job/:id", ({ params }) => {
    return "job by id";
  })
  .get("/v1/audits/:correlationId", ({ params }) => {
    return "audits";
  })
  .post("/v1/secrets/:operatorId", async ({ params, body }) => {
    return "post secrets";
  })
  .get("/v1/secrets/:operatorId", async ({ params }) => {
    return "get secrets";
  })
  .get("/v1/metrics", () => {
    return "metrics";
  })