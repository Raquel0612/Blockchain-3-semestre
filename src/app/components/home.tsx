import Desafio from "./desafio";
import Decks from "./cartas";
import Rare from "./rarecard";
import Advise from "./advise";
import Biblioteca from "./biblioteca";
import RA from "./ra";

export default function Home() {
    return (
        <div>
            <Desafio />
            <Decks />
            <Rare />
            <Advise />
            <Biblioteca />
            <RA />
        </div>
    );
}