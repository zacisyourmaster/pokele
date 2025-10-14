import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";
// import img_src from "./assets/whos_that_pokemon.png"
export default function App() {
  return (
    <div className="app max-w-4xl mx-auto ">
      <Header />
      {/* <img className="max-w-xl m-auto"src={img_src} /> */}
      <Game />
      <Footer />
    </div>
  );
}
