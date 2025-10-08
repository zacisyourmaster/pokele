// import img_src from "../assets/whos_that_pokemon.png";
import ReactConfetti from "react-confetti";
interface GameStatusProps {
  status: "playing" | "won" | "lost";
  answer?: string;
  onRestart: () => void;
}

export default function GameStatus({
  status,
  answer,
  onRestart,
}: GameStatusProps) {
  if (status === "playing") return null;
  //  <img className="max-w-xl m-auto" src={img_src} />;

  return (
    <div className="mt-6 text-center relative">
      {status === "won" && (
        <>
          <ReactConfetti numberOfPieces={300} recycle={false} />
          <p className="text-green-600 font-bold">🎉 You guessed it!</p>
        </>
      )}
      {status === "lost" && (
        <p className="text-red-600 font-bold">
          ❌ Out of guesses! The Pokémon was{" "}
          <span className="underline">{answer}</span>.
        </p>
      )}
      <button
        onClick={onRestart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Play Again
      </button>
    </div>
  );
}
