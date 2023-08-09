import axios from 'axios';
import { type Pokemon } from "../model/Pokemon"
import vueAppConfig from '../config'; // Adjust the path based on your project's structure

export async function getAllPokemon(): Promise<Pokemon[]> {
    try {
        const response = await axios.get<Pokemon[]>(vueAppConfig.EC2_BASE_URL);
        console.log("Baramee",response.data as Pokemon[]);
        return response.data as Pokemon[];
    } catch (error) {
        alert("Make sure to change the EC2_BASE_URL if its already done, then there's some other issue (check console)");
        console.error('Error fetching Pokémon data:', "error message here");
        throw error;
    }
}