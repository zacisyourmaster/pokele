import { useState } from "react";

interface GuessInputProps {
  onSubmitGuess: (pokemonName: string) => void;
  gameOver: boolean;
  pokemonNames: string[];
}

export default function GuessInput({
  onSubmitGuess,
  gameOver,
  pokemonNames,
}: GuessInputProps) {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = pokemonNames.filter((name) =>
    name.toLowerCase().startsWith(value.toLowerCase())
  );

  const handleSelect = (name: string) => {
    setValue(name);
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmitGuess(value.trim().toLowerCase());
    setValue("");
  };

  return (
    <div className="mt-4 search-box text-center bg-gray-100 p-[20px] rounded-xl mb-[30px] shadow-md">
      <div className="input-group flex gap-2.5">
        <div className="flex-1 relative">
          <input
            className="w-full p-3 border-2 rounded-md border-[#ddd] text-black"
            role="search"
            type="search"
            placeholder={gameOver ? "Game Over!!!" : "Type a Pokémon name..."}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            disabled={gameOver}
          />

          {showSuggestions && value && filtered.length > 0 && (
            <ul className="absolute left-0 right-0 bg-gray-100/85 text-neutral-800 font-semibold border border-gray-200 mt-1 rounded-md max-h-40 overflow-y-auto text-left z-10">
              {filtered.slice(0, 10).map((name) => (
                <li
                  key={name}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className={`px-6 py-3 rounded-md  ${
            gameOver
              ? "bg-gray-300 text-black/70 cursor-not-allowed"
              : "bg-red-500 cursor-pointer"
          }`}
          onClick={handleSubmit}
          disabled={gameOver}
        >
          Guess
        </button>
      </div>
    </div>
  );
}
