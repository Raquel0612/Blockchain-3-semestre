import { Limelight } from 'next/font/google';
import Image from "next/image";

import Conv from '../img/home/conv.png';
import Luas from '../img/home/luas.png';
import Estrela from '../img/home/estrela.png';

const limelight = Limelight({
    weight : '400',
    style : 'normal',
    subsets : ['latin']})

export default function Desafio() {
    return (
        <label id='guard-label' className={limelight.className}>
            <Image className='conv' src={Conv} width={600} height={310} alt=''/>
            <label className='desafio-label'>
                <Image className='moon' src={Luas} width={500} height={200} alt=''/>
            </label>

            <label className='desafio-label'>
                <p>Está lançado o desafio!<br /><br /> O campo está sendo montado para receber todas<br /> as classes: <br />
                🟫 Bronze | ⚪ Prata | 🟡 Ouro | 💎 Diamante <br />
                Cada classe terá seu próprio território de disputa. <br />
                É hora de mostrar sua habilidade, sua estratégia e<br /> a força do seu deck.<br />
                O jogo é justo, a competição é real, e a glória está<br /> ao alcance de quem ousar!<br />
                Em breve, abriremos as inscrições.<br />
                <br />
                Garanta já o seu baralho! </p>
                <Image src={Estrela} width={100} height={100} alt=''/>
            </label>
        </label>
    )
}