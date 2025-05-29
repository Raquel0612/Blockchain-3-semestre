import { Limelight } from 'next/font/google';
import { Tangerine } from 'next/font/google';

import Image from "next/image";

import Rara from '../img/home/rare.png';
import Coin from '../img/home/coin.png';
import Luas from '../img/home/luas.png';
import Promo from '../img/home/promocao.png';
import Sparkles from '../img/home/sparkles.gif';

const limelight = Limelight({
    weight : '400',
    style : 'normal',
    subsets : ['latin']})

const tangerine = Tangerine({
    weight : '400',
    style : 'normal',
    subsets : ['latin']})

export default function Rare() {
    return (
        <label id='guard-label'>
            <label className='rarecard-label'>
                <h1 className={tangerine.className}> Edição Lendária da Temporada </h1>
                <p className={limelight.className}>
                Forjado para os estrategistas mais ousados, o novo Deck<br /> Diamante 
                chega com cartas exclusivas, raridades elevadas<br /> e habilidades que podem virar o jogo.<br /><br />
                Essa edição é feita para quem não aceita menos do que o topo.
                </p>
            </label>

            <label className='rarecard-image'>
                <Image className='luas' src={Luas} width={200} alt=''/>
                <Image className='promo' src={Promo} width={180} alt=''/>
                <Image className='sparkles-left' src={Sparkles} width={130} alt=''/>
                <Image className='sparkles-right' src={Sparkles} width={130} alt=''/>
                <Image src={Rara} width={300} height={500} alt=''/>
                <div className='value'> <p> 149.99 </p> <Image src={Coin} width={80} height={80} alt=''/> </div>
            </label>
        </label>
    )
}