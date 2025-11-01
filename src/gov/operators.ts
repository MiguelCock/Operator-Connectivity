import { OperatorInfo } from "../types/gov";
import { BASE_URL } from "./general";

export async function getOperators(): Promise<OperatorInfo> {
  const res = await fetch(`${BASE_URL}/apis/getOperators`, { method: "GET" });
  return res.json();
}

/*
GET /apis/getOperators
Example response:
200 ok
Example Value Model 
[
 {
  "OperatorId": "65ca0a00d833e984e2608756",
  "OperatorName": "Operador 123",
  "transferAPIURL": "http://mioperador.com/api/transferCitizen"
 },
 {
  "OperatorId":"65ca0a00d833e984e2608758",
  "OperatorName": "Operador 456",
  "transferAPIURL": "http://mioperador.com/api/transferCitizen"
 },
 {
  "OperatorId": "65ca0a00d833e984e2608761",
  "OperatorName": "Operador 789",
  "transferAPIURL": "http://mioperador.com/api/transferCitizen"
 }
] 
500 failed : Application Error..
501 failed : Wrong Parameters..
*/