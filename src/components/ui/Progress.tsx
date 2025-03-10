import { DecimalPrecision } from "@/utils/utils";
import { useEffect, useState } from "react";

type ProgressProps = {
    count: number;
    total: number;
    label: string;
    showPercentage?: boolean;
}

function preciseDivide(a: number, b: number, decimalPlaces: number): number {
    if (b === 0) throw new Error("Division by zero");
    const result = a / b;
    return DecimalPrecision.round(result, decimalPlaces);
}
export default function Progress(
    { count = 1,
        total = 1,
        label,
        showPercentage = true }: ProgressProps
) {
    const [percentage, setPercentage] = useState(0);
    useEffect(() => {
        const result = preciseDivide(count, total, 6);
        const newPercentage = Math.min(Math.max(Number((result * 100).toFixed(2)), 0), 100); // 限制在 0-100%
        setPercentage(newPercentage);
    }, [count, total])
    return (
        <>
            {
                showPercentage && <ul
                    className="flex justify-between items-center gap-[14px] text-preset-4 leading-preset-2 tracking-counter-2"
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={label}
                >
                    <li className="w-4">{label}</li>
                    <li className="relative grow h-3 overflow-hidden dark:bg-neutral-800 bg-neutral-100 rounded-full">
                        {
                            percentage > 0 && <div className={`transition-all duration-300 ease-in-out bg-counter-purple-400 w-full h-full rounded-full`}
                                style={{ width: `${percentage}%` }}
                            ></div>
                        }
                    </li>
                    <li className="flex-none w-[88px] text-right">{`${count}(${percentage}%)`}</li>
                </ul>
            }</>
    )
}