export default function Header(){
    return(
    <header className="w-5xl max-w-full text-center md:mb-2 border-b-2 border-gray-500 py-2 md:py-0">
      <h1 className="text-4xl md:text-5xl md:mb-3 font-semibold">Poké<span className="text-red-500">le</span>!</h1>
      <p className="subtitle text-lg">Gotta <span className="italic">Guess</span> 'Em All!</p>
    </header>)
}