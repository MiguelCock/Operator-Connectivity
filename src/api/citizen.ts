import { Elysia, status, t } from "elysia";
import { validateCitizen } from "../gov/valiadte_citizen";
import { registerCitizen } from "../gov/register_citizen";
import { CitizenSchema, UnregisterCitizenSchema } from "../types/gov";
import { unregisterCitizen } from "../gov/unregister_citizen";


export const CitizenEndpoints = new Elysia({ prefix: '/citizen' })
  .post("/", async ({ body }) => {
    switch (await registerCitizen(body)) {
      case 201:
        return status(201);
      case 500:
        return status(500);
      case 501:
        return status(501, "Wrong Parameters");
      case 502:
        return status(502, "Teacher server down");
      default:
        return status(500);
    }
  }, {
    body: CitizenSchema,
  })
  .get("id/:id", async ({ params }) => {
    switch (await validateCitizen(params.id)) {
      case 200:
        return status(200);
      case 204:
        return status(204);
      case 500:
        return status(500);
      case 501:
        return status(501, "Wrong Parameters");
      case 502:
        return status(502, "Teacher server down");
      default:
        return status(500);
    }
  }, {
    params: t.Object({
      id: t.Number()
    })
  })
  .delete("/", async ({ body }) => {
    switch (await unregisterCitizen(body)) {
      case 201:
        return status(201);
      case 204:
        return status(204);
      case 500:
        return status(500);
      case 501:
        return status(501, "Wrong Parameters");
      case 502:
        return status(502, "Teacher server down");
      default:
        return status(500);
    }
  }, {
    body: UnregisterCitizenSchema,
  })

