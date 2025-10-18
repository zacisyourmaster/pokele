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
    <div className="mt-4 search-box flex justify-center text-start md:bg-gray-100 md:p-5 rounded-xl md:mb-7.5 md:shadow-md ">
      <div className="input-group flex flex-row space-x-2 w-sm md:w-full">
        <div className="flex-1 relative">
          {/* <div className="flex-1 relative"> */}
          <input
            className="w-full p-1 md:p-3 border-2 rounded border-[#ddd] text-neutral-100 md:text-black"
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
            <ul
              className="absolute top-full left-0 z-[99] w-full 
                        bg-neutral-300/85 text-neutral-800 font-medium mb-1 
                          rounded border-2 border-neutral-950 
                          divide-y-2 divide-neutral-950 
                          max-h-52 overflow-y-auto overflow-x-hidden"
            >
              {filtered.slice(0, 10).map((name) => (
                <li
                  key={name}
                  className="p-1 md:my-0.5 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className={`p-1 md:px-6 md:py-3 rounded-md  ${
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
