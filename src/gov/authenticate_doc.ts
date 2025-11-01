import { AuthenticateDocument } from "../types/gov";
import { BASE_URL } from "./general";

export async function authenticateDocument(data: AuthenticateDocument) {
  const res = await fetch(`${BASE_URL}/apis/authenticateDocument`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.status;
}

/*
PUT /apis/authenticateDocument
Example body:
{
 "idCitizen": 1234567890,
 "UrlDocument": "https://<bucket-name>.s3.amazonaws.com/bae728c7-a7a3-4942-b9b5-3ca0…-b91126bb3d8f.image.jpg?AWSAccessKeyId=<AWS_ACCESS_KEY>&Expires=145671",
 "documentTitle": "Diploma Grado"
}
Example response:
200 ok Example Value Model "El documento: Diploma Grado del ciudadano 1234567890 ha sido autenticado exitosamente"
204 Not Content
500 failed : Application Error..
501 failed : Wrong Parameters..
*/