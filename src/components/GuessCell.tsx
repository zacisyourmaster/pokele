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

// export interface ComparisonResult {
//   id: 'higher' | 'lower' | 'equal';
//   height: 'higher' | 'lower' | 'equal';
//   weight: 'higher' | 'lower' | 'equal';
//   baseStatTotal: 'higher' | 'lower' | 'equal';
//   typesMatch: number;     // 0, 1, 2
//   abilitiesMatch: number; // how many abilities matched
// }

export default function GuessCell({ guess }: GuessCellProps) {
  const { pokemon, comparison } = guess;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 text-xs sm:text-sm md:text-base border items-center text-center rounded p-2 mb-2">
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
      {/* <div
        role="cell"
        className={`cell-types flex flex-wrap justify-center items-center gap-1 ${
          comparison.typesMatch === pokemon.types.length
            ? "bg-green-600 text-white"
            : ""
        }`}
      >
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="type-badge rounded p-1 text-shadow-lg uppercase"
            style={{
              backgroundColor: TYPE_COLORS[type] || "#AAA",
              color: "white",
            }}
          >
            {type}
          </span>
        ))}
        {comparison.typesMatch === 0 && " ❌"}
        {comparison.typesMatch > 0 &&
          comparison.typesMatch < pokemon.types.length &&
          ` (${comparison.typesMatch} match)`}
      </div> */}
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
        className={`cell-abilities flex flex-wrap justify-center items-center gap-1 capitalize ${
          comparison.abilitiesMatch === pokemon.abilities.length
            ? "bg-green-600 text-white rounded"
            : ""
        }`}
      >
        {pokemon.abilities.map((ability, index) => (
          <span key={ability} className="ability-badge">
            {`${index + 1}. ${ability}`}
          </span>
        ))}
        {comparison.abilitiesMatch === 0 && " ❌"}
        {comparison.abilitiesMatch > 0 &&
          comparison.abilitiesMatch < pokemon.abilities.length &&
          ` (${comparison.abilitiesMatch} match)`}
      </div>
      <div
        role="cell"
        className="cell-generation"
        // className={`cell-generation rounded ${
        //   comparison.gen === "equal" ? "bg-green-600 text-white" : ""

        // }`}
      >
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
      {/* <span className={`rounded p-1 text-semibold ${
          comparison.height === "equal" ? "bg-green-600 text-white" : ""
        }`}>
          {pokemon.height / 10}m
          </span> */}
      <div role="cell" className="cell-height">
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
      </div>
      <div role="cell" className="cell-bst">
        <span
          className={`rounded p-1 text-semibold ${
            comparison.baseStatTotal === "equal" ? "bg-green-600 text-white" : ""
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
