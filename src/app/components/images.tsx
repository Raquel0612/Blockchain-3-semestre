import Image from "next/image";
import Sparkle1 from '../img/header/1.png';
import Sparkle2 from '../img/header/2.png';

export default function Images() {
    return (
        <label className="images">
            <Image src={Sparkle1} width={300} height={300} alt="Sparkles" />
            <Image src={Sparkle2} width={300} height={300} alt="Sparkles" />
        </label>
    )
}