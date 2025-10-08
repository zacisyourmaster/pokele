
// interface Pokemon {
//   id: number;
//   name: string;
//   types: string[];
//   abilities: string[];
//   height: number;
//   weight: number;
//   baseStatTotal: number;
//   gen: number;
// }


// const BASE_URL: string = 'https://pokeapi.co/api/v2';
// // https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0
// // const pokedex: Pokemon[]=[]
// // for (let i = 1; i <= 898; i++) {
// //   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
// //   const data = await res.json();
// //   allPokemon.push({
// //     id: data.id,
// //     name: data.name,
// //     types: data.types.map(t => t.type.name),
// //     height: data.height,
// //     weight: data.weight
// //   });
// // }

// async function fetchAllPokemonData(): Promise<Pokemon[]> {
//   const allPokemon: Pokemon[] = [];
  
//   // Fetch the list of all Pokémon first
//   const listRes = await fetch(`${BASE_URL}/pokemon?limit=1025&offset=0`);
//   const listData = await listRes.json();
  
//   console.log(`Fetching data for ${listData.results.length} Pokémon...`);
  
//   // Fetch details for each Pokémon
//   for (let i = 0; i < listData.results.length; i++) {
//     try {
//       const pokemonRes = await fetch(`${BASE_URL}/pokemon/${i + 1}`);
//       const pokemonData = await pokemonRes.json();
      
//       // Calculate base stat total
//       const baseStatTotal = pokemonData.stats.reduce(
//         (sum: number, stat: any) => sum + stat.base_stat,
//         0
//       );
      
//       // Fetch species data to get generation
//       const speciesRes = await fetch(pokemonData.species.url);
//       const speciesData = await speciesRes.json();
//       const genNumber = parseInt(speciesData.generation.url.split('/').slice(-2, -1)[0]);
      
//       allPokemon.push({
//         id: pokemonData.id,
//         name: pokemonData.name,
//         types: pokemonData.types.map((t: any) => t.type.name),
//         abilities: pokemonData.abilities.map((a: any) => a.ability.name),
//         height: pokemonData.height,
//         weight: pokemonData.weight,
//         baseStatTotal,
//         gen: genNumber,
//       });
      
//       // Log progress every 50 Pokémon
//       if ((i + 1) % 50 === 0) {
//         console.log(`Progress: ${i + 1}/${listData.results.length}`);
//       }
//     } catch (error) {
//       console.error(`Error fetching Pokémon #${i + 1}:`, error);
//     }
//   }
  
//   return allPokemon;
// }