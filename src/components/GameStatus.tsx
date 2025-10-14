import img_src from "../assets/whos_that_pokemon.png";
interface GameStatusProps {
  status: "playing" | "won" | "lost";
  answer: string;
  onRestart: () => void;
}

export default function GameStatus({
  status,
  answer,
  onRestart,
}: GameStatusProps) {
  // const { width, height } = useWindowSize();
  if (status === "playing") return <img className="max-w-xl m-auto" src={img_src} />;

  return (
    <div className="mt-6 text-center relative">
      <img className="max-w-xl m-auto" src={img_src} />
      {status === "won" && (
        <p className="text-green-600 font-bold">🎉 You guessed it!</p>
      )}
      {status === "lost" && (
        <p className="text-red-600 font-bold">
          ❌ Out of guesses! The Pokémon was{" "}
          <span className="underline">{answer[0]}</span>.
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
