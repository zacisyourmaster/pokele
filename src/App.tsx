import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
// import img_src from "./assets/whos_that_pokemon.png"
export default function App() {
  return (
    <div
      className="
        flex flex-col items-center
        w-full md:max-w-5xl overflow-x-hidden
        mx-auto relative space-y-8 
      bg-neutral-800/30 backdrop-blur-md 
        shadow-lg p-4 sm:p-6 md:p-8"
      id="app"
    >
      <Header />
      <Game />
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
