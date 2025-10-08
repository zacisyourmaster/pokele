import type { Guess } from "../types/pokemon";
import GuessCell from "./GuessCell";

interface GuessRowProps {
  guessIdx: number;
  guess: Guess;
}

export default function GuessRow({ guessIdx, guess }: GuessRowProps) {
  return (
    // <div role="row" id={`guess_${guessIdx}`}>
        <div className="row" id={`guess${guessIdx}`}>
          <GuessCell guessIdx={guessIdx} guess={guess} />
        </div>
    // </div>
  );
}
