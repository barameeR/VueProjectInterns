import axios from 'axios';
import {  type Pokedex, type Pokemon } from "../model/Pokemon"
export async function getAllPokemon(): Promise<Pokedex> {
    try {
        const response = await axios.get<Pokedex>('http://localhost:3000/pokedex');
        return response.data;
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