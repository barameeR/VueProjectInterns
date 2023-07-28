// export interface Pokedex {
//     pokedexArray: Pokemon[]
// }

export interface Pokemon {
    num: number;
    name: string;
    variations: Variation[];
    link: string;
}

export interface Variation {
    name: string;
    description: string;
    image: string;
    types: string[];
    specie: string;
    height: number;
    weight: number;
    abilities: string[];
    stats: Stats;
    evolutions: string[];
}

export interface Stats {
    total: number;
    hp: number;
    attack: number;
    defense: number;
    speedAttack: number;
    speedDefense: number;
    speed: number;
}
