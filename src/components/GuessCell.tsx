import type { Guess } from "../types/pokemon";

interface GuessCellProps {
  guessIdx: number;
  guess: Guess;
}
const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};


export default function GuessCell({ guess }: GuessCellProps) {
  const { pokemon, comparison } = guess;

  return (

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 text-xs sm:text-sm md:text-base shadow-lg border border-neutral-700 items-center text-center bg-neutral-800 rounded-xl p-2 mb-2">
      <div role="cell" className="cell-name capitalize font-semibold">
        {pokemon.name}
      </div>
      <div role="cell" className="cell-id">
        <span
          className={`rounded p-1 text-semibold ${
            comparison.id === "equal" ? "bg-green-600 text-white" : ""
          }`}
        >
          #{pokemon.id}
          {comparison.id === "lower" && " 🔼"}
          {comparison.id === "higher" && " 🔽"}
        </span>
      </div>
      <div
        role="cell"
        className="cell-types flex flex-wrap justify-center gap-1"
      >
        {pokemon.types.map((type) => {
          const isMatched = comparison.typesMatch.includes(type);
          return (
            <span
              key={type}
              className={`type-badge rounded p-0.5 text-shadow-lg uppercase border-3 ${
                isMatched ? "border-green-600" : "border-red-500"
              }`}
              style={{
                backgroundColor: TYPE_COLORS[type] || "#AAA",
                color: "white",
              }}
            >
              {type}
            </span>
          );
        })}
      </div>
      <div
        role="cell"
        className="cell-abilities flex flex-wrap justify-center items-center gap-1 capitalize"
      >
        {pokemon.abilities.map((ability) => {
          const matched = comparison.abilitiesMatch.includes(ability);
          return (
            <span
              key={ability}
              className={`ability-badge rounded px-1 border-3 capitalize ${
                matched ? "border-green-600" : "border-red-500"
              }`}
            >
            {ability}
            </span>
          );
        })}
      </div>
      <div role="cell" className="cell-generation">
        <span
          className={`p-1 rounded ${
            comparison.gen === "equal" ? "bg-green-600 text-white" : ""
          }`}
        >
          {pokemon.gen}
          {comparison.gen === "lower" && " 🔼"}
          {comparison.gen === "higher" && " 🔽"}
        </span>
      </div>
      {/* <div role="cell" className="cell-height">
        <span
          className={`rounded p-1 text-semibold ${
            comparison.height === "equal" ? "bg-green-600 text-white" : ""
          }`}
        >
          {pokemon.height / 10} m{comparison.height === "lower" && " 🔼"}
          {comparison.height === "higher" && " 🔽"}
        </span>
      </div>
      <div role="cell" className="cell-weight">
        <span
          className={`rounded p-1 text-semibold ${
            comparison.weight === "equal" ? "bg-green-600 text-white" : ""
          }`}
        >
          {pokemon.weight / 10} kg{comparison.weight === "lower" && " 🔼"}
          {comparison.weight === "higher" && " 🔽"}
        </span>
      </div> */}
      <div role="cell" className="cell-bst">
        <span
          className={`rounded p-1 text-semibold ${
            comparison.baseStatTotal === "equal"
              ? "bg-green-600 text-white"
              : ""
          }`}
        >
          {pokemon.baseStatTotal}
          {comparison.baseStatTotal === "lower" && " 🔼"}
          {comparison.baseStatTotal === "higher" && " 🔽"}
        </span>
      </div>
    </div>
  );
}
