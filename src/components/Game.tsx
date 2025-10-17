import { useState } from "react";
import GuessInput from "./GuessInput";
import GuessList from "./GuessList";
import PokemonHintPanel from "./PokemonHintPanel";
import GameStatus from "./GameStatus";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import {
  compareGuesses,
  getTodaysPokemon,
  getRandomPokemon,
  MAX_GUESSES,
} from "../utils/gameUtils";
import pokemonList from "../data/answerList.json";
// import answerList from "../data/answerList.json";

import type { Guess, Pokemon } from "../types/pokemon";

export default function Game() {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );

  // const todaysAnswer = getTodaysPokemon();
  const [todaysAnswer, setAnswer] = useState<Pokemon>(getTodaysPokemon());
  // const pokemonList = pokemonData;

  const handleGuess = (userGuess: string) => {
    if (gameStatus !== "playing") return;

    const guessPokemon = pokemonList.find(
      (p) => p.name.toLowerCase() === userGuess.toLowerCase()
    );

    if (guessPokemon) {
      const comparison = compareGuesses(guessPokemon, todaysAnswer);
      const newGuess: Guess = { pokemon: guessPokemon, comparison };

      setGuesses((prevGuesses) => {
        const alreadyGuessed = prevGuesses.some(
          (g) =>
            g.pokemon.name.toLowerCase() === guessPokemon.name.toLowerCase()
        );

        if (alreadyGuessed) return prevGuesses;
        return [...prevGuesses, newGuess];
      });

      if (guessPokemon.id === todaysAnswer.id) {
        setGameStatus("won");
      } else if (guesses.length >= MAX_GUESSES) {
        setGameStatus("lost");
      }
    }
  };

  const handleRestart = () => {
    setGuesses([]);
    setGameStatus("playing");
    setAnswer(getRandomPokemon());
  };
  const { width, height } = useWindowSize();
  const pokemonNames = pokemonList
    .map((p) => {
      return p.name.replace("-", " ").toUpperCase();
    })
    .sort();

  return (
    <div className="flex flex-col w-full flex-grow max-w-5xl px-6 game-container">
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
