import GuessInput from "./GuessInput";

import type { Pokemon, Guess, ComparisonResult } from "../types/pokemon";
import GuessList from "./GuessList";
import PokemonHintPanel from "./PokemonHintPanel";
import { useState } from "react";
import GameStatus from "./GameStatus";

import pokemonData from "../data/pokemon.json";
import answerList from "../data/answerList.json";



import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const MAX_GUESSES = 6;
const START_DATE = new Date(); //new Date(launch day)

function getPokeleIndex():number {
  const today = new Date();

  // Reset both dates to midnight for clean day calculation
  const epochMidnight = new Date(
    START_DATE.getFullYear(),
    START_DATE.getMonth(),
    START_DATE.getDate()
  );
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Calculate difference in days
  const diffTime = todayMidnight.getTime() - epochMidnight.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

// function getRandomAnswer() {
//   return pokemonData[Math.floor(Math.random() * pokemonData.length)];
// }

function getTodaysPokemon(): Pokemon {
  const todaysPokemonIndex = getPokeleIndex();
  return answerList[todaysPokemonIndex];
}

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

  const todaysAnswer = getTodaysPokemon();
  console.log(todaysAnswer)
  // const [answer, setAnswer] = useState<Pokemon>(getRandomAnswer());
  const pokemonList = pokemonData;

  const handleGuess = (userGuess: string) => {
    if (gameStatus !== "playing") return;
    const guessPokemon = pokemonList.find(
      (p) => p.name.toLowerCase() === userGuess.toLowerCase()
    );
    if (guessPokemon) {
      const comparison = compareGuesses(guessPokemon, todaysAnswer);
      const newGuesses = [...guesses, { pokemon: guessPokemon, comparison }];
      setGuesses(newGuesses);
      if (guessPokemon.id === todaysAnswer.id) {
        setGameStatus("won");
      } else if (newGuesses.length >= MAX_GUESSES) {
        setGameStatus("lost");
      }
    }
  };

  const handleRestart = () => {
    setGuesses([]);
    setGameStatus("playing");
    // setAnswer(getRandomAnswer());
  };
  const { width, height } = useWindowSize();
  const pokemonNames= pokemonList.map(p=>{
    return p.name.replace('-',' ').toUpperCase()
  })
  return (
    <div className="game-container">
      {gameStatus==="won"&&<Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            recycle={false}
          />}
      <GameStatus
        status={gameStatus}
        answer={todaysAnswer.name}
        onRestart={handleRestart}
        imageUrl={`/src/assets/pokemon_imgs/p_${todaysAnswer.id}.png`}
      />
      <GuessInput onSubmitGuess={handleGuess} pokemonNames={pokemonNames} gameOver={gameStatus!="playing"}/>
      <GuessList guesses={guesses} />
      <PokemonHintPanel />
    </div>
  );
}
