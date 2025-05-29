import Image from "next/image";
import Logo from '../img/home/logofoot.png';
import Pirim from '../img/header/prinkles.gif';
import Linha from '../img/home/linha.png';
import Tools from '../img/home/tools.png';

import { Limelight } from 'next/font/google';

const limelight = Limelight({
    weight : '400',
    style : 'normal',
    subsets : ['latin']})

export default function Footer() {
    return (
        <footer className={limelight.className}>
        <div className="wrapper"> <Image className="linha" src={Linha} width={2000} alt="Logo" /> </div>
            <div className="foot-guard">
                <h2>FALE CONOSCO</h2>
                <p> Avenida das Lamentações, Rua<br/> do Bobo, N00 </p>
                <p> mystcard@bleh.com.br </p>
                <p> +55 (11) 94002-8922 </p>
            </div>

            <div className="foot-guard">
                <Image className="prinkfoot1" src={Pirim} width={60} height={60} alt="Logo" />
                <Image className="logo" src={Logo} width={500} height={200} alt="Logo" />
                <Image className="prinkfoot2" src={Pirim} width={60} height={60} alt="Logo" />
            </div>

            <div className="foot-guard">
                <h2>FALE CONOSCO</h2>
                    <Image className="tools" src={Tools} width={300} alt="Logo" />
                <h2>MUITO OBRIGADO!</h2>
            </div>
        </footer>
    )
}