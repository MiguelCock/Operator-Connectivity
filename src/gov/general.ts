import { registerCitizen} from "./register_citizen";
import { validateCitizen } from "./valiadte_citizen";
import { unregisterCitizen } from "./unregister_citizen";

export const BASE_URL = "https://govcarpeta-apis-4905ff3c005b.herokuapp.com";

async function example() {
  try {
    const newCitizen = await registerCitizen({
      id: 5421243214,
      name: "Carlos Andres Caro",
      address: "Cra 54 # 45 -67",
      email: "caro@mymail.com",
      operatorId: "65ca0a00d833e984e2608756",
      operatorName: "Operador Ciudadano",
    });
    console.log("Citizen registered:", newCitizen);
  } catch (error) {
    console.error("API Error:", error);
  }

  try {
    const newCitizen = await validateCitizen(5421243214);
    console.log("Citizen validated:", newCitizen);
  } catch (error) {
    console.error("API Error:", error);
  }

  try {
      const newCitizen = await unregisterCitizen({
        id: 5421243214,
        operatorId: "65ca0a00d833e984e2608756",
        operatorName: "Operador Ciudadano",
      });
    console.log("Citizen unregistered:", newCitizen);
  } catch (error) {
    console.error("API Error:", error);
  }

  try {
    const newCitizen = await validateCitizen(5421243214);
    console.log("Citizen not found:", newCitizen);
  } catch (error) {
    console.error("API Error:", error);
  }
}

example();