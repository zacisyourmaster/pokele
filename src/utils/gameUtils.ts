// utils/gameUtils.ts

import type { Pokemon, ComparisonResult } from "../types/pokemon";
import answerList from "../data/answerList.json";

export const MAX_GUESSES = 6;
export const START_DATE = new Date("2025-10-16");

export function getPokeleIndex(): number {
  const today = new Date();
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
  const diffTime = todayMidnight.getTime() - epochMidnight.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function getTodaysPokemon(): Pokemon {
  const todaysPokemonIndex = getPokeleIndex() % answerList.length;
  return answerList[todaysPokemonIndex];
}
export function getRandomPokemon(): Pokemon {
  const randomIndex = Math.floor(Math.random() * answerList.length)
  return answerList[randomIndex]
}
export function compareGuesses(guess: Pokemon, answer: Pokemon): ComparisonResult {
  let id: "higher" | "lower" | "equal" = "equal";
  if (guess.id > answer.id) id = "higher";
  else if (guess.id < answer.id) id = "lower";

  let height: "higher" | "lower" | "equal" = "equal";
  if (guess.height > answer.height) height = "higher";
  else if (guess.height < answer.height) height = "lower";

  let weight: "higher" | "lower" | "equal" = "equal";
  if (guess.weight > answer.weight) weight = "higher";
  else if (guess.weight < answer.weight) weight = "lower";

  let baseStatTotal: "higher" | "lower" | "equal" = "equal";
  if (guess.baseStatTotal > answer.baseStatTotal) baseStatTotal = "higher";
  else if (guess.baseStatTotal < answer.baseStatTotal) baseStatTotal = "lower";

  const typesMatch = guess.types.filter(t => answer.types.includes(t));
  const abilitiesMatch = guess.abilities.filter(a => answer.abilities.includes(a)).length;

  let gen: "higher" | "lower" | "equal" = "equal";
  if (guess.gen > answer.gen) gen = "higher";
  else if (guess.gen < answer.gen) gen = "lower";

  return { id, height, weight, baseStatTotal, typesMatch, abilitiesMatch, gen };
}
