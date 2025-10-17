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
        <a href={`https://pokemondb.net/pokedex/${answer}`}className="underline capitalize">{answer}</a>!
      </p>;
    }
  };

  if (status === "playing")
    return (
      <img
        className="my-6 w-full max-w-full object-contain m-auto block rounded brightness-90"
        src={img_src}
      />
    );

  return (
    <div className="my-6 text-center relative flex flex-col items-center font-bold text-xl">
      <h2 className="capitalize text-3xl">{answer}</h2>
      <img
        className="w-lg h-lg max-w-full object-contain m-auto block rounded"
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
