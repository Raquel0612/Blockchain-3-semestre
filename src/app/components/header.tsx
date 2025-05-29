import Image from "next/image";
import Logo from '../img/header/MystCard.png';
import pirim from '../img/header/prinkles.gif';
import login from '../img/header/login.png';
import carrinho from '../img/header/carrinho.png';

import { Limelight } from 'next/font/google';

const limelight = Limelight({
    weight : '400',
    style : 'normal',
    subsets : ['latin']})

export default function Header() {
    return (
        <header className={limelight.className}>
            <div className="link-box">
                <a href="/home"> Sobre Nós </a>
                <a href="/home"> Contato </a>
            </div>

            <div className="logo-box">
                <Image className="prink1" src={pirim} width={60} height={60} alt="Logo" />
                <a href="../"> <Image className="logo" src={Logo} width={500} height={200} alt="Logo" /> </a>
                <Image className="prink2" src={pirim} width={60} height={60} alt="Logo" />
            </div>

            <div className="link-box">
                <a href="../random"> <Image src={carrinho} width={80} height={80} alt="biblioteca"/> </a>
                <a href="../login"> <Image src={login} width={100} height={100} alt="login"/> </a>
            </div>
        </header>
    )
}