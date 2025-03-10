
import Chatacter from "@/assets/images/pattern-character-count.svg";
import Sentence from "@/assets/images/pattern-sentence-count.svg";
import Word from "@/assets/images/pattern-word-count.svg";
import { textNoSpace } from "@/utils/utils";

type CountCardProps = {
    label: string;
    labelNote?: string;
    labelNoteShow?: boolean;
    msg?: string;
    count: number;
    className?: string;
    cardType?: "character" | "word" | "sentence";
    // xOffset?: number;
    // yOffset?: number;

}

export default function CountCard({
    className,
    label,
    labelNote = '',
    labelNoteShow = false,
    msg = '',
    count,
    cardType,
    // xOffset = 0,
    // yOffset = 0, 
}: CountCardProps) {

    const handleCountText = (count: number) => {
        if (labelNoteShow) {
            const noSpace = textNoSpace(msg);
            return String(noSpace.length).padStart(2, "0");
        }
        return String(count).padStart(2, "0");
    }
    return (
        <div className={`relative 
            overflow-hidden 
            tablet:h-[150px] h-[130px]
            flex flex-col justify-center 
            desktop:gap-[5px] gap-2
            desktop:p-4 tablet:py-4 tablet:px-3
            p-5
            text-neutral-900 rounded-radius-12 
            ${className}`}>
            <p className="tablet:text-preset-1 text-preset-mobile-1 leading-preset-1 tracking-counter-1 font-bold z-10">{handleCountText(count)}</p>
            <p className="desktop:pt-[5px] tablet:pt-[8px] text-preset-3 leading-preset-3 tracking-counter-2 z-10">{label}{labelNoteShow && labelNote}</p>
            {
                cardType === "character" && <Chatacter width={150} height={150}
                    className={`absolute
                   desktop:translate-x-[184px] tablet:translate-x-[132px] translate-x-[224px]`}
                // style={{
                //     transform: `translate(${xOffset}px, ${yOffset}px)`, // 使用 transform 實現偏移
                // }}
                />
            }
            {
                cardType === "word" && <Word width={150} height={150}
                    className={`absolute
                   desktop:translate-x-[184px] tablet:translate-x-[132px] translate-x-[224px]
                   `}
                // style={{
                //     transform: `translate(${xOffset}px, ${yOffset}px)`, // 使用 transform 實現偏移
                // }}
                />
            }
            {
                cardType === "sentence" && <Sentence width={150} height={150}
                    className={`absolute inset-0 
                   desktop:translate-x-[184px] tablet:translate-x-[132px] translate-x-[224px]`}
                // style={{
                //     transform: `translate(${xOffset}px, ${yOffset}px)`, // 使用 transform 實現偏移
                // }}
                />
            }
        </div>
    )
}