import { type Pokemon } from "@/model/Pokemon";
import jsonData from "@/assets/pokemon.json";

const fetchDataFromJson = async (): Promise<Pokemon[]> => {
  try {
    console.log("baramee",)
    return await jsonData as Pokemon[];
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export default fetchDataFromJson;