import axios from 'axios';
import { type Pokemon } from "../model/Pokemon"
export async function getAllPokemon(): Promise<Pokemon[]> {
    try {
        const response = await axios.get<Pokemon[]>('http://ec2-3-27-4-172.ap-southeast-2.compute.amazonaws.com:8080/pokemon');
        console.log("Baramee",response.data as Pokemon[]);
        return response.data as Pokemon[];
    } catch (error) {
                console.error('Error fetching Pokémon data:', "error message here");
        throw error;
    }
}

export const getPokemonById = async (id :number): Promise<Pokemon[]> => {
    try {
        let url = `http://ec2-3-27-4-172.ap-southeast-2.compute.amazonaws.com:8080/pokemon?num=`+id
        const response = await axios.get<Pokemon[]>(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', "error message here");
        throw error;
    }
  
}