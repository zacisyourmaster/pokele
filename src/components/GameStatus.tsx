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
  const renderGameStatusMessage = () => {
    if (status === "won") {
      return (
        <p className="text-green-600 font-bold">🎉 You guessed it!</p>
        
      );
    }
    if (status === "lost") {
      return <p className="text-red-500 font-bold">
        ❌ Out of guesses! The Pokémon was{" "}
        <a href={`https://pokemondb.net/pokedex/${answer}`}  target="_blank " className="underline capitalize">{answer}</a>!
      </p>;
    }
  };

  if (status === "playing")
    return (
      <img
        className="my-6 max-w-full max-h-50 md:max-h-full object-contain m-auto block rounded brightness-90"
        src={img_src}
      />
    );

  return (
    <div className="mb-1 mt-2 md:my-6 text-center relative flex flex-col items-center font-bold md:text-xl">
      <h2 className="capitalize text-2xl md:text-3xl">{answer}</h2>
      <img
        className="h-75 md:h-full max-w-full max-h-full object-contain m-auto block rounded transition duration-300 m"
        src={imageUrl}
      />
      {renderGameStatusMessage()}
      <button
        onClick={onRestart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Play Again
      </button>
    </div>
  );
}
