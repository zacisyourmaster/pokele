import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
// import img_src from "./assets/whos_that_pokemon.png"
export default function App() {
  return (
    // <div className="app max-w-4xl mx-auto">
    <div className="app flex flex-col items-center justify-center relative max-w-7xl min-w-5xl mx-auto bg-neutral-800 p-6" id='app'>
      <Header />
      {/* <img className="max-w-xl m-auto"src={img_src} /> */}
      <Game />
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
