// Run this script with: node scripts/fetchPokemonData.js
// Make sure you have Node.js installed

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchAllPokemonData() {
  const allPokemon = [];

  console.log("Fetching Pokémon list...");
  const listRes = await fetch(`${BASE_URL}/pokemon?limit=1025&offset=0`);
  const listData = await listRes.json();

  console.log(`Fetching data for ${listData.results.length} Pokémon...`);
  console.log("This may take several minutes...\n");

  for (let i = 0; i < listData.results.length; i++) {
    try {
      // Fetch Pokémon details
      const pokemonRes = await fetch(`${BASE_URL}/pokemon/${i + 1}`);
      const pokemonData = await pokemonRes.json();

      // Calculate base stat total
      const baseStatTotal = pokemonData.stats.reduce(
        (sum, stat) => sum + stat.base_stat,
        0
      );

      // Fetch species data to get generation
      const speciesRes = await fetch(pokemonData.species.url);
      const speciesData = await speciesRes.json();
      const genUrl = speciesData.generation.url;
      const genNumber = parseInt(genUrl.split("/").slice(-2, -1)[0]);

      allPokemon.push({
        id: pokemonData.id,
        name: pokemonData.name,
        types: pokemonData.types.map((t) => t.type.name),
        abilities: pokemonData.abilities.map((a) => a.ability.name),
        height: pokemonData.height,
        weight: pokemonData.weight,
        baseStatTotal,
        gen: genNumber,
      });

      // Log progress every 50 Pokémon
      if ((i + 1) % 50 === 0) {
        console.log(`Progress: ${i + 1}/${listData.results.length}`);
      }

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 50));
    } catch (error) {
      console.error(`Error fetching Pokémon #${i + 1}:`, error.message);
    }
  }

  return allPokemon;
}

async function main() {
  try {
    const pokemonData = await fetchAllPokemonData();

    // Save to JSON file in src directory
    const outputPath = path.join(
      __dirname,
      "..",
      "src",
      "data",
      "pokemon.json"
    );
    const outputDir = path.dirname(outputPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(pokemonData, null, 2));

    console.log("\n✅ Success!");
    console.log(`📁 Saved ${pokemonData.length} Pokémon to: ${outputPath}`);
    console.log(
      `📊 File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(
        2
      )} MB`
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
