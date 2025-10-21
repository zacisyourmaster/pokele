
# Pokéle

A small React + TypeScript game: like Wordle but with Pokémon. Guess the target Pokémon using attributes (id, types, abilities, generation height, weight, BST)

Work in progress !!

Todo:

- Change image when game over ✅
- Input autocomplete ✅
- Add Pokemon generation column ✅
- Make restart button choose random pokemon ✅
- Update ability column to show which abilites match ✅
- **Priority**: Mobile Friendly UI ✅
- Indicate if a pokemon attribute such as bst, height, weight is close to answer

Long-Term:

- User Accounts

## Features

- Guess Pokémon and get attribute comparisons
- Autocomplete search input
- Highlights which abilities match the answer
- Party mechanic: wrong guesses cause party members to "faint"
- Image shown for the answer (from PokeAPI / GitHub raw sprites)
- Mobile-friendly UI

## Tech

- React + TypeScript
- Tailwind CSS (utility classes visible in components)
- Uses PokeAPI / raw.githubusercontent.com for artwork
- Small Python helper to download images to src/assets/pokemon_imgs

## Quick start

1. Install dependencies
   - npm:
  
     ```bash
     npm install
     ```

2. Run the app
   - Vite:
  
     ```bash
     npm run dev
     ```

## Data & images

- JSON data lives in `src/data/` (e.g. `answerList.json`, `newPokemonList.json`, `pokemon.json`).
- Artwork is expected in `src/assets/pokemon_imgs` as `p_<id>.png`.
- A helper script is provided: `scripts/add_image.py`. Run it to download images referenced by `newPokemonList.json`:

  ```bash
  python scripts/add_image.py
  ```

## Contributing

Open an issue or send a PR. Keep changes small and focused.

## License

MIT