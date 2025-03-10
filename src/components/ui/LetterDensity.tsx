import { useState } from "react"
import Progress from "./Progress";
import { ArrowIcon } from "./customIcon/ArrowIcon";
import { CharCount } from "@/utils/textProcessor";
import { textNoSpace } from "@/utils/utils";
interface LetterDensityItem {
    letter: string;
    count: number;
}

type LetterDensityProps = {
    initialVisibleItems?: number;
    letterCount?: CharCount;
    isNoSpaces?: boolean;
    totalCaracters?: string;
}

export default function LetterDensity({
    // children,
    initialVisibleItems = 5,
    letterCount = {},
    totalCaracters = '',
    isNoSpaces = false,
}: LetterDensityProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const transData: LetterDensityItem[] = Object.entries(letterCount).map(([letter, count]) => {
        return {
            letter,
            count,
        }
    }).sort((a, b) => b.count - a.count);
    const visibleItems = isExpanded ? transData : transData.slice(0, initialVisibleItems);
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    }
    const handleCountText = (text: string) => {
        if (isNoSpaces) {
            const noSpace = textNoSpace(text);
            return noSpace.length;
        }
        return text.length;
    }
    return (
        <>
            <ul className="flex flex-col gap-3 mt-5">
                {visibleItems.map((item, index) => (
                    <li key={index}>
                        <Progress
                            label={item.letter}
                            count={item.count}
                            total={handleCountText(totalCaracters)}
                        />
                    </li>
                ))}
            </ul>
            {transData.length > initialVisibleItems && (
                <button
                    onClick={handleToggle}
                    className="mt-5 flex items-center gap-2
                    text-preset-3 text-neutral-900 dark:text-neutral-200 focus:outline-none"
                >
                    <span>
                        {isExpanded ? 'See less' : 'See more'}
                    </span>
                    <span>
                        <ArrowIcon
                            isExpanded={isExpanded}
                        />
                    </span>
                </button>
            )}
        </>
    )
}