import IconCheck from "@/assets/images/icon-check.svg";
import { ChangeEvent, useState } from "react";

type CustomCheckbox2Props = {
    label: string;
    disabled?: boolean;
}

export default function CustomCheckboxStyle3({ label = '', disabled = true }: CustomCheckbox2Props) {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        setIsChecked(newChecked);
    }
    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id={`self-checkbox-${label}`}
                className="hidden peer"
                onChange={handleCheckbox}
                checked={isChecked}
                disabled={disabled}
            />
            <label
                htmlFor={`self-checkbox-${label}`}
                className="flex items-center space-x-2 cursor-pointer text-preset-4 leading-preset-2 tracking-counter-2"
            >
                <span className={`w-4 h-4 
                flex justify-center items-center
                border-[1px] rounded 
                dark:border-neutral-200  border-neutral-900
                peer-checked:bg-counter-purple-500 peer-checked::border-transparent
                transition-all duration-100
                ${isChecked ? 'bg-counter-purple-500 border-counter-purple-500 dark:border-counter-purple-500' : ''}
                ${disabled && "opacity-50"}
                `}>
                    {isChecked && <IconCheck className="inline-block w-3 h-auto" />}
                </span>
                <span className={`${disabled && "opacity-50"}`}>{label}</span>
            </label>
        </div>
    )
}