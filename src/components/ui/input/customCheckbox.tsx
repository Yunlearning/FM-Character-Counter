import { ChangeEvent, useState } from "react";
import IconCheck from "@/assets/images/icon-check.svg";

type checkboxProps = {
    label: string;
    checked?: boolean;
    disabled?: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
};

export default function CustomCheckbox({
    label,
    checked = false,
    disabled = false,
    onChange,
    className = "",
}: checkboxProps) {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const newChecked = e.target.checked;
        setIsChecked(newChecked);
        onChange(newChecked)
    }
    return (
        <div className={`flex items-center gap-2 ${className}
        dark:text-neutral-200 text-neutral-900
        `}>
            <input type="checkbox"
                id={`custom-checkbox-${label}`}
                className="hidden peer"
                onChange={handleCheckbox}
                checked={checked}
                disabled={disabled}
            />
            <label htmlFor={`custom-checkbox-${label}`}
                className="flex items-center gap-2 cursor-pointer text-preset-4 leading-preset-2 tracking-counter-2"
            >
                <span
                    className={`w-4 h-4 rounded relative
                        flex justify-center items-center
                        border-[1px] dark:border-neutral-200  
                        border-neutral-900
                        peer-checked:bg-counter-purple-500 peer-checked:border-transparent
                    transition-all duration-200 
                    
                        ${isChecked ? 'bg-counter-purple-500 border-counter-purple-500 dark:border-counter-purple-500' : ''}
                        ${disabled ? 'opacity-50' : ''}
                    `}
                >
                    {isChecked && (
                        <IconCheck className="inline-block w-3 h-auto" />
                    )}
                </span>
                <span className={` ${disabled ? "opacity-50" : ""}`}>{label}</span>
            </label>
        </div>
    );
}
