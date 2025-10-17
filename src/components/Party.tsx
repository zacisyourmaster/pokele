import pokeBall from "../assets/Poke_Ball.png";
import { clsx } from "clsx";

interface PartyProps {
  wrongGuessCount: number;
}

export default function Party({ wrongGuessCount }: PartyProps) {
  const totalBalls = 6;
  const balls = Array.from({ length: totalBalls }, (_, i) => i);

  return (
    <div className="flex flex-col items-center my-3">
      <h2 className=" underline text-lg font-semibold text-neutral-100 tracking-wide">
        Your Party 
      </h2>
        <p className="mb-3 text-sm">(Don't let them all feint!)</p>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        {balls.map((i) => (
          <img
            key={i}
            src={pokeBall}
            className={clsx(
              "w-[45px] transition duration-300",
              i < wrongGuessCount && "grayscale opacity-60"
            )}
          />
        ))}
      </div>
    </div>
  );
}
