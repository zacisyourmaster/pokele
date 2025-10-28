import { useState, useEffect } from "react";
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
  const [currentImg, setCurrentImg] = useState(img_src);
  const [fade, setFade] = useState(false);

  // Smoothly transition from default image to the Pokémon image
  useEffect(() => {
    if (status !== "playing") {
      setFade(true);
      const timeout = setTimeout(() => {
        setCurrentImg(imageUrl);
        setFade(false);
      }, 300); // fade-out duration
      return () => clearTimeout(timeout);
    } else {
      setCurrentImg(img_src);
    }
  }, [status, imageUrl]);

  const renderGameStatusMessage = () => {
    switch (status) {
      case "won":
        return (
          <p className="text-green-500 font-bold text-lg md:text-xl mt-2">
            🎉 You guessed it!
          </p>
        );
      case "lost":
        return (
          <p className="text-red-500 font-bold text-lg md:text-xl mt-2">
            ❌ Out of guesses! The Pokémon was{" "}
            <a
              href={`https://pokemondb.net/pokedex/${answer}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline capitalize hover:text-red-400 transition"
            >
              {answer}
            </a>
            !
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center text-center mt-4 md:mt-8 space-y-4">
      <figure className="relative w-full flex flex-col justify-center">
        {status !== "playing" && (
          <figcaption className="mt-2 text-2xl md:text-3xl font-bold capitalize">
            {answer}
          </figcaption>
        )}
        <img
          key={currentImg}
          src={currentImg}
          alt={
            status === "playing"
              ? "Who's that Pokémon silhouette"
              : `${answer} revealed`
          }
          className={`max-w-full max-h-64 md:max-h-80 object-contain rounded transition-all duration-500 ${
            fade ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        />
      </figure>

      {renderGameStatusMessage()}

      {status !== "playing" && (
        <button
          onClick={onRestart}
          className="mt-3 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors duration-200"
        >
          Play Again
        </button>
      )}
    </div>
  );
}
