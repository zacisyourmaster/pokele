# Fetch Pokémon Data

This script fetches all Pokémon data from PokeAPI and saves it to a JSON file.

## How to Run

### Option 1: Using Node.js (JavaScript)
```bash
node scripts/fetchPokemonData.js
```

### Option 2: Using TypeScript (recommended)
First, install tsx if you don't have it:
```bash
npm install -D tsx
```

Then run:
```bash
npx tsx scripts/fetchPokemonData.ts
```

## What it does

1. Fetches a list of all Pokémon (1025+)
2. For each Pokémon, fetches:
   - Basic info (id, name, types, abilities, height, weight)
   - Base stat total (calculated from stats)
   - Generation number (from species endpoint)
3. Saves all data to `src/data/pokemon.json`

## Time

This will take **5-10 minutes** to complete because:
- It makes 2-3 API calls per Pokémon
- Includes a 50ms delay between requests to avoid rate limiting
- Total of ~3000+ API calls

## Output

The script creates:
- `src/data/pokemon.json` (~2-3 MB file)
- Contains an array of all Pokémon with their complete data

## Using the Data

After running, you can import the data in your app:

```typescript
import pokemonData from './data/pokemon.json';

// Use it in your game
const randomPokemon = pokemonData[Math.floor(Math.random() * pokemonData.length)];
```
