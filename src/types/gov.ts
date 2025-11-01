import { t, Static } from "elysia";

export const CitizenSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  address: t.String(),
  email: t.String({ format: 'email' }),
  operatorId: t.String(),
  operatorName: t.String()
});

export type Citizen = Static<typeof CitizenSchema>;

export const UnregisterCitizenSchema = t.Object({
  id: t.Number(),
  operatorId: t.String(),
  operatorName: t.String()
});

export const OperatorInfoSchema = t.Array(
  t.Object({
    OperatorId: t.String(),
    OperatorName: t.String(),
    transferAPIURL: t.String({format: 'uri'})
  })
);

export type OperatorInfo = Static<typeof OperatorInfoSchema>;

export type UnregisterCitizen = Static<typeof UnregisterCitizenSchema>;

export const AuthenticateDocumentSchema = t.Object({
  idCitizen: t.Number(),
  UrlDocument: t.String({format: 'uri'}),
  documentTitle: t.String()
});

export type AuthenticateDocument = Static<typeof AuthenticateDocumentSchema>;