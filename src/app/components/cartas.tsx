import { Limelight } from 'next/font/google';
import Image from "next/image";

import Luas from '../img/home/luas.png';
import Coin from '../img/home/coin.png';

import Bronze from '../img/home/1.png';
import Prata from '../img/home/2.png';
import Ouro from '../img/home/3.png';

const limelight = Limelight({
    weight : '400',
    style : 'normal',
    subsets : ['latin']})

export default function Decks() {
    return (
        <label id='deck' className={limelight.className}>
            <label className='cards'>
                <Image className='decks-moon' src={Luas} width={200} height={80} alt=''/>
                <a href='#'> <Image className='decks-card' src={Bronze} width={200} height={300} alt='carta'/> </a>

                <p className='decks-text'> Ideal para quem está começando<br /> sua jornada nos campos de<br /> batalha.<br />
                Combinando cartas essenciais e<br /> estratégias equilibradas, o Deck<br /> 
                Bronze é a porta de entrada para<br /> o universo dos duelos. </p>

                <div className='value'> <p> 59.99 </p> <Image src={Coin} width={80} height={80} alt=''/> </div>
            </label>

            <label className='cards'>
                <Image className='decks-moon' src={Luas} width={200} height={80} alt=''/>
                <a href='#'> <Image className='decks-card' src={Prata} width={200} height={300} alt='carta'/> </a>

                <p className='decks-text'> Mais refinado, mais versátil. O Deck<br /> Prata traz novas combinações e<br /> cartas 
                    com habilidades<br /> aprimoradas, perfeitas para quem<br /> já domina o básico e quer subir de<br /> nível. </p>

                <div className='value'> <p> 79.99 </p> <Image src={Coin} width={80} height={80} alt=''/> </div>
            </label>

            <label className='cards'>
                <Image className='decks-moon' src={Luas} width={200} height={80} alt=''/>
                <a href='#'> <Image className='decks-card' src={Ouro} width={200} height={300} alt='carta'/> </a>

                <p className='decks-text'> Força, inteligência e impacto. O<br /> Deck Ouro é para jogadores<br /> experientes que 
                    buscam jogadas<br /> decisivas e cartas com potencial de<br /> virada. </p>

                <div className='value'> <p> 109.99 </p> <Image src={Coin} width={80} height={80} alt=''/> </div>
            </label>
        </label>
    )
}