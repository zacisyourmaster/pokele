export default function Footer() {
  return (
    <footer className="border-t-3 mt-5 flex flex-col gap-3 p-6 text-center text-md text-gray-200 w-5xl max-w-full">
      <p>Built by <a className="underline" href="https://zacisyourmaster.github.io">Zach Smith</a> using React + PokéAPI</p>
      <p className="text-gray-500 text-sm text-start">
        <span className="font-bold">Disclaimer</span>: Pokémon and all associated names, images, and assets are ©
        Nintendo, Creatures Inc., and GAME FREAK Inc.<br /> This fan-made project is
        not affiliated with or endorsed by Nintendo, Creatures Inc., or GAME
        FREAK Inc. All Pokémon images and data are used under fair use for
        non-commercial, educational, and entertainment purposes only.
      </p>
    </footer>
  );
}