import axios from 'axios';
// import { Pokemon } from "../model/Pokemon"
export async function getAllPokemon(): Promise<any[]> {
    try {
        const response = await axios.get<any[]>('http://localhost:3000/pokedex');
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', "error message here");
        throw error;
    }
}