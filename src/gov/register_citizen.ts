import { Citizen } from "../types/gov";
import { BASE_URL } from "./general";

export async function registerCitizen(data: Citizen): Promise<number> {
  const res = await fetch(`${BASE_URL}/apis/registerCitizen`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.status;
}

/*
POST /apis/registerCitizen
Example body:
{ 
 "id": 1234567890,
 "name": "Carlos Andres Caro",
 "address": "Cra 54 # 45 -67",
 "email": "caro@mymail.com",
 "operatorId": "65ca0a00d833e984e2608756",
 "operatorName": "Operador Ciudadano"
}
Example response:
201 Created: Ciudadano con id: 123 se ha relacionado con OPerador abc. Creado exitosamente
500 failed : Application Error..
501 failed: Error al crear Ciudadano con id: 123 ya se encuentra registrado en la carpeta ciudadana
*/