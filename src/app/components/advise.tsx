import Image from "next/image";

import Advise from '../img/home/advise.png';

export default function Rare() {
    return (
        <label id='guard-advise'>
            <Image className='advise' src={Advise} width={900} alt=''/>
        </label>
    )
}