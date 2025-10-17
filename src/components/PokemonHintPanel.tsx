export default function PokemonHintPanel() {
  return (
    <div className="mt-6 p-4 border rounded bg-neutral-800 text-neutral-50">
      <h2 className="font-bold mb-2 text-lg">How to Play</h2>
      <p className="text-sm mb-3">
        Guess the Pokémon of the day! Type a Pokémon name and press Guess. After
        each guess, you'll see hints comparing your guess to the correct
        Pokémon. Use them to narrow it down before you run out of guesses!
      </p>

      <h2 className="font-bold mb-2 text-lg">Hints</h2>
      <ul className="text-sm space-y-1">
        <li>⬆️ means the correct Pokémon's value is higher.</li>
        <li>⬇️ means the correct Pokémon's value is lower.</li>
        <li>✅ means exact match.</li>
        <li>Types and Abilities show how many match with the answer.</li>
      </ul>
    </div>
  );
}
