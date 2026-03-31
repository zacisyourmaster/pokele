import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
// import img_src from "./assets/whos_that_pokemon.png"
export default function App() {
  return (
    <div
      className="relative mx-auto flex w-full flex-col items-center space-y-8 overflow-x-hidden bg-neutral-800/30 p-4 shadow-lg backdrop-blur-md sm:p-6 md:max-w-5xl md:p-8"
      id="app"
    >
      <Header />
      <Game />
      <Footer />
      <Toaster position="top-center" />
      <Analytics />
    </div>
  );
}
