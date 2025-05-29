import Image from "next/image";
import Bann from '../img/bib/bann.png';
import Deck from '../img/bib/decks.png';
import Plus from '../img/bib/plus.png';

import { Limelight } from 'next/font/google';



const limelight = Limelight({
    weight : '400',
    style : 'normal',
    subsets : ['latin']})

export default function Biblioteca() {
    return (
        <section className={limelight.className}>
            <Image className='deck' src={Bann} width={300} alt=''/>
            <div className="bib-container">
                <div className="card-align">
                    <Image className='deck' src={Deck} width={400} alt=''/>
                    <a className='plus' href="../random"> <Image src={Plus} width={80} alt=''/> </a>
                </div>

                <div className="card-align">
                    <Image className='deck' src={Deck} width={400} alt=''/>
                    <a className='plus' href="../random"> <Image src={Plus} width={80} alt=''/> </a>
                </div>

                <div className="card-align">
                    <Image className='deck' src={Deck} width={400} alt=''/>
                    <a className='plus' href="../random"> <Image src={Plus} width={80} alt=''/> </a>
                </div>
            </div>

            <div className="container">
                <div className="card-align">
                    <Image className='deck' src={Deck} width={400} alt=''/>
                    <a className='plus' href="../random"> <Image src={Plus} width={80} alt=''/> </a>
                </div>
            </div>
        </section>
    )
}