import Image from "next/image";
import Logo from '../img/header/MystCard.png';
import pirim from '../img/header/prinkles.gif';

import { Limelight } from 'next/font/google';

const limelight = Limelight({
    weight : '400',
    style : 'normal',
    subsets : ['latin']})

export default function Header() {
    return (
        <header className={limelight.className}>
            <div className="logo-box">
                <Image className="prink1" src={pirim} width={60} height={60} alt="Logo" />
                <a href="../login"> <Image className="logo" src={Logo} width={500} height={200} alt="Logo" /> </a>
                <Image className="prink2" src={pirim} width={60} height={60} alt="Logo" />
            </div>
        </header>
    )
}