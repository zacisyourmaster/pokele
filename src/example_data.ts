export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
  baseStatTotal: number;
}
export const POKEMON_DATA: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    types: ["Grass", "Poison"],
    abilities: ["Overgrow", "Chlorophyll"],
    height: 7,
    weight: 69,
    baseStatTotal: 318,
  },
  {
    id: 4,
    name: "Charmander",
    types: ["Fire"],
    abilities: ["Blaze", "Solar Power"],
    height: 6,
    weight: 85,
    baseStatTotal: 309,
  },
  {
    id: 7,
    name: "Squirtle",
    types: ["Water"],
    abilities: ["Torrent", "Rain Dish"],
    height: 5,
    weight: 90,
    baseStatTotal: 314,
  },
  {
    id: 25,
    name: "Pikachu",
    types: ["Electric"],
    abilities: ["Static", "Lightning Rod"],
    height: 4,
    weight: 60,
    baseStatTotal: 320,
  },
  {
    id: 6,
    name: "Charizard",
    types: ["Fire", "Flying"],
    abilities: ["Blaze", "Solar Power"],
    height: 17,
    weight: 905,
    baseStatTotal: 534,
  },
  {
    id: 3,
    name: "Venusaur",
    types: ["Grass", "Poison"],
    abilities: ["Overgrow", "Chlorophyll"],
    height: 20,
    weight: 1000,
    baseStatTotal: 525,
  },
  {
    id: 9,
    name: "Blastoise",
    types: ["Water"],
    abilities: ["Torrent", "Rain Dish"],
    height: 16,
    weight: 855,
    baseStatTotal: 530,
  },
  {
    id: 94,
    name: "Gengar",
    types: ["Ghost", "Poison"],
    abilities: ["Cursed Body"],
    height: 15,
    weight: 405,
    baseStatTotal: 500,
  },
  {
    id: 150,
    name: "Mewtwo",
    types: ["Psychic"],
    abilities: ["Pressure", "Unnerve"],
    height: 20,
    weight: 1220,
    baseStatTotal: 680,
  },
  {
    id: 143,
    name: "Snorlax",
    types: ["Normal"],
    abilities: ["Immunity", "Thick Fat"],
    height: 21,
    weight: 4600,
    baseStatTotal: 540,
  },
  {
    id: 131,
    name: "Lapras",
    types: ["Water", "Ice"],
    abilities: ["Water Absorb", "Shell Armor"],
    height: 25,
    weight: 2200,
    baseStatTotal: 535,
  },
  {
    id: 149,
    name: "Dragonite",
    types: ["Dragon", "Flying"],
    abilities: ["Inner Focus", "Multiscale"],
    height: 22,
    weight: 2100,
    baseStatTotal: 600,
  },
];
