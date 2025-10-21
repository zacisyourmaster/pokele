import { useState, useEffect } from "react";
import GuessInput from "./GuessInput";
import GuessList from "./GuessList";
import PokemonHintPanel from "./PokemonHintPanel";
import GameStatus from "./GameStatus";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import toast from "react-hot-toast";
import {
  compareGuesses,
  getTodaysPokemon,
  getRandomPokemon,
  MAX_GUESSES,
} from "../utils/gameUtils";
import pokemonList from "../data/answerList.json";
// import answerList from "../data/answerList.json";

import type { Guess, Pokemon } from "../types/pokemon";
import Party from "./Party";

function getRandomParty(): string[] {
  const shuffled = [...pokemonList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, MAX_GUESSES).map((p) => p.name);
}

export default function Game() {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [todaysAnswer, setAnswer] = useState<Pokemon>(getTodaysPokemon());
  const [party, setParty] = useState<string[]>([]);
  const [wrongGuessCount, setWrongGuessCount] = useState(0);

  useEffect(() => {
    setParty(getRandomParty());
  }, []);

  const handleGuess = (userGuess: string) => {
    if (gameStatus !== "playing") return;

    const guessPokemon = pokemonList.find(
      (p) => p.name.toLowerCase() === userGuess.toLowerCase().replace(' ','-').trim()
    );
    if (!guessPokemon) return;

    const comparison = compareGuesses(guessPokemon, todaysAnswer);
    const newGuesses = [...guesses, { pokemon: guessPokemon, comparison }];
    setGuesses(newGuesses);

    if (guessPokemon.id !== todaysAnswer.id) {
      setWrongGuessCount((prev) => {
        const next = prev + 1;
        const faintedName = party[prev];
        if (faintedName) {
          const formattedName = faintedName
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
          toast.error(`${formattedName} has fainted!`, {
            style: { background: "#1f2937", color: "white" },
            icon: "💫",
          });
        }
        return next;
      });
    }

    // Check game status after updating guesses
    if (guessPokemon.id === todaysAnswer.id) {
      setGameStatus("won");
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameStatus("lost");
    }
  };

  const handleRestart = () => {
    setGuesses([]);
    setGameStatus("playing");
    setAnswer(getRandomPokemon());
    setWrongGuessCount(0);
    setParty(getRandomParty());
  };
  const { width, height } = useWindowSize();
  const pokemonNames = pokemonList
    .map((p) => {
      return p.name.replace("-", " ").toUpperCase();
    })
    .sort();

  return (
    <div className="flex flex-col md:w-5xl flex-grow max-w-full px-6 game-container">
      {gameStatus === "won" && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          recycle={false}
        />
      )}
      <GameStatus
        status={gameStatus}
        answer={todaysAnswer.name}
        onRestart={handleRestart}
        imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${todaysAnswer.id}.png`}
      />
      <Party wrongGuessCount={wrongGuessCount} />
      <GuessInput
        onSubmitGuess={handleGuess}
        pokemonNames={pokemonNames}
        gameOver={gameStatus != "playing"}
      />
      <GuessList guesses={guesses} />
      <PokemonHintPanel />
    </div>
  );
}
