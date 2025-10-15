import img_src from "../assets/whos_that_pokemon.png";
interface GameStatusProps {
  status: "playing" | "won" | "lost";
  answer: string;
  imageUrl: string;
  onRestart: () => void;
}

export default function GameStatus({
  status,
  answer,
  imageUrl,
  onRestart,
}: GameStatusProps) {
  if (status === "playing") return <img className="max-w-[100%] m-auto" src={img_src} />;

  return (
    <div className="mt-6 text-center relative flex flex-col items-center">
      <img className="max-w-[100%] m-auto" src={imageUrl} />
      {status === "won" && (
        <p className="text-green-600 font-bold">🎉 You guessed it!</p>
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
