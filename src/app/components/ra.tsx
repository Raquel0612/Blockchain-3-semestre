import Image from "next/image";

import RA from '../img/home/ra.png';

export default function Rare() {
    return (
        <label id='guard-advise'>
            <Image className='ra' src={RA} width={1050} alt=''/>
        </label>
    )
}