import type { Guess } from "../types/pokemon";
import GuessRow from "./GuessRow";

interface GuessListProps {
  guesses: Guess[];
}

export default function GuessList({ guesses }: GuessListProps) {
  const MAX_GUESSES = 6;

  const rows = Array.from(
    { length: MAX_GUESSES },
    (_, i) => guesses[i] || null
  );

  return (
    <div className="mt-8 mb-8 max-w-full" id="guesses-container" role="table">
      <div
        className="grid grid-cols-7 gap-3 text-base md:text-xl border-b border-dashed mb-4 pb-2"
        role="row"
        aria-label="Column Labels for the Guesses"
      >
        <label role="columnheader" aria-sort="none" aria-label="Name" className="text-center">
          Name
        </label>
        <label role="columnheader" aria-sort="none" aria-label="Number" className="text-center">
          Number
        </label>
        <label role="columnheader" aria-sort="none" aria-label="Type(s)" className="text-center">
          Type(s)
        </label>
        <label role="columnheader" aria-sort="none" aria-label="Abilities" className="text-center">
          Abilities
        </label>
        <label role="columnheader" aria-sort="none" aria-label="Height" className="text-center">
          Height
        </label>
        <label role="columnheader" aria-sort="none" aria-label="Weight" className="text-center">
          Weight
        </label>
        <label role="columnheader" aria-sort="none" aria-label="BST" className="text-center">
          BST
        </label>
      </div>
      {rows.map((guess, i) =>
        guess ? (
          <GuessRow key={i} guessIdx={i} guess={guess} />
        ) : (
          <div
            key={i}
            className="empty-row grid grid-cols-7 gap-3 bg-white rounded p-2 mb-2"
            role="row"
          >
            <span className="col-span-7 text-center rounded-sm text-black font-bold text-xl p-3">
              {i+1}
            </span>
          </div>
        )
      )}
    </div>
  );
}
