import GuessInput from "./GuessInput";

import type { Pokemon, Guess, ComparisonResult } from "../types/pokemon";
import GuessList from "./GuessList";
import PokemonHintPanel from "./PokemonHintPanel";
import { useState } from "react";
import GameStatus from "./GameStatus";

import pokemonData from "../data/pokemon.json";

function getRandomAnswer() {
  return pokemonData[Math.floor(Math.random() * pokemonData.length)];
}

const MAX_GUESSES = 6;

//going to change this later
function compareGuesses(guess: Pokemon, answer: Pokemon): ComparisonResult {
  // Compare id
  let id: "higher" | "lower" | "equal" = "equal";
  if (guess.id > answer.id) id = "higher";
  else if (guess.id < answer.id) id = "lower";

  // Compare height
  let height: "higher" | "lower" | "equal" = "equal";
  if (guess.height > answer.height) height = "higher";
  else if (guess.height < answer.height) height = "lower";

  // Compare weight
  let weight: "higher" | "lower" | "equal" = "equal";
  if (guess.weight > answer.weight) weight = "higher";
  else if (guess.weight < answer.weight) weight = "lower";

  // Compare baseStatTotal
  let baseStatTotal: "higher" | "lower" | "equal" = "equal";
  if (guess.baseStatTotal > answer.baseStatTotal) baseStatTotal = "higher";
  else if (guess.baseStatTotal < answer.baseStatTotal) baseStatTotal = "lower";

  // Compare types
  const typesMatch = guess.types.filter((t) => answer.types.includes(t));

  // Compare abilities
  const abilitiesMatch = guess.abilities.filter((a) =>
    answer.abilities.includes(a)
  ).length;

  return {
    id,
    height,
    weight,
    baseStatTotal,
    typesMatch,
    abilitiesMatch,
  };
}

export default function Game() {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [answer, setAnswer] = useState<Pokemon>(getRandomAnswer());
  const pokemonList = pokemonData;

  const handleGuess = (userGuess: string) => {
    if (gameStatus !== "playing") return;
    const guessPokemon = pokemonList.find(
      (p) => p.name.toLowerCase() === userGuess.toLowerCase()
    );
    if (guessPokemon) {
      const comparison = compareGuesses(guessPokemon, answer);
      const newGuesses = [...guesses, { pokemon: guessPokemon, comparison }];
      setGuesses(newGuesses);
      if (guessPokemon.id === answer.id) {
        setGameStatus("won");
      } else if (newGuesses.length >= MAX_GUESSES) {
        setGameStatus("lost");
      }
    }
  };

  const handleRestart = () => {
    setGuesses([]);
    setGameStatus("playing");
    setAnswer(getRandomAnswer());
  };

  return (
    <div className="game-container">
      <GameStatus
        status={gameStatus}
        answer={answer.name}
        onRestart={handleRestart}
      />
      <GuessInput onSubmitGuess={handleGuess} />
      <GuessList guesses={guesses} />
      <PokemonHintPanel />
    </div>
  );
}
