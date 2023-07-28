import axios from 'axios';
import { type Pokemon } from "../model/Pokemon"
export async function getAllPokemon(): Promise<Pokemon[]> {
    try {
        const response = await axios.get<Pokemon[]>('http://localhost:3000/pokedex');
        console.log("Baramee",response.data as Pokemon[]);
        return response.data as Pokemon[];
    } catch (error) {
        console.error('Error fetching Pokémon data:', "error message here");
        throw error;
    }
}

export const getPokemonById = async (id :number): Promise<Pokemon[]> => {
    try {
        let url = `http://localhost:3000/pokedex?num=`+id
        const response = await axios.get<Pokemon[]>(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', "error message here");
        throw error;
    }
  
}