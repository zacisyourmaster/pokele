
import pokemonData from '../src/data/pokemon.json' with { type: 'json' };
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const shufflePokemonList = (data) => {
  let currentIndex = data.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [data[currentIndex], data[randomIndex]] = [
      data[randomIndex],
      data[currentIndex],
    ];
  }

  return data;
};


function main() {
  try {
    const shuffledList =  shufflePokemonList(pokemonData);

    // Save to JSON file in src directory
    const outputPath = path.join(
      __dirname,
      "..",
      "src",
      "data",
      "answerList.json"
    );
    console.log(outputPath)
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