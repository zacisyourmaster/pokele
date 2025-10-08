import { useState } from "react";

interface GuessInputProps {
  onSubmitGuess: (pokemonName: string) => void;
}

export default function GuessInput({ onSubmitGuess }: GuessInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmitGuess(value.trim().toLowerCase());
    setValue("");
  };

  return (
    <div className="mt-4 search-box text-center bg-white p-[20px] rounded-xl mb-[30px] shadow-md">
      <div className="input-group flex gap-2.5">
        <input
          className="flex-1 p-3 border-2 rounded-md border-[#ddd] text-black"
          role="search"
          type="search"
          placeholder="Type a Pokémon name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          className="bg-red-500 px-6 py-3 rounded-md"
          onClick={handleSubmit}
        >
          Guess
        </button>
      </div>
    </div>
  );
}
