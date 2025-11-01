import { Elysia } from "elysia";
import { OperatorInfoSchema } from "../types/gov";
import { getOperators } from "../gov/operators";


export const OperatorsEndpoints = new Elysia({ prefix: '/operators' })
  .get("/", async () => {
    const res = await getOperators();
    console.log(res)
    return res;
  }, {
    response: OperatorInfoSchema
  })

