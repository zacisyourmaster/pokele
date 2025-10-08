export default function PokemonHintPanel() {
  return (
    <div className="mt-6 p-4 border rounded bg-neutral-800">
      <h2 className="font-bold mb-2">Hints</h2>
      <ul className="text-sm text-neutral-50">
        <li>⬆️ means the correct Pokémon’s value is higher.</li>
        <li>⬇️ means the correct Pokémon’s value is lower.</li>
        <li>✅ means exact match.</li>
        <li>Types/Abilities show how many match with the answer.</li>
      </ul>
    </div>
  );
}
