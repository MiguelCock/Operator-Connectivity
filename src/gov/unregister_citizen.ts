import { UnregisterCitizen } from "../types/gov";
import { BASE_URL } from "./general";

export async function unregisterCitizen(
  data: UnregisterCitizen
): Promise<number> {
  const res = await fetch(`${BASE_URL}/apis/unregisterCitizen`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.status;
}

/*
DELETE /apis/unregisterCitizen
Example body: 
{
 "id": 1234567890,
 "operatorId": "65ca0a00d833e984e2608756",
 "operatorName": "Operador Ciudadano"
}
Example response:
201 Deleted
204 Not Content
500 failed : Application Error..
501 failed : Wrong Parameters..
*/