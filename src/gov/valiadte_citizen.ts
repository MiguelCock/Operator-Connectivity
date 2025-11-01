import { BASE_URL } from "./general";

export async function validateCitizen(id: number): Promise<number> {
  try {
    const res = await fetch(`${BASE_URL}/apis/validateCitizen/${id}`, {
      method: "GET",
    });
    return res.status
  } catch (netErr) {
    return 502;
  }
}

/*
GET /apis/validateCitizen/{id}
Example response:
200 OK
204 Not Content
500 failed : Application Error..
501 failed : Wrong Parameters..
*/