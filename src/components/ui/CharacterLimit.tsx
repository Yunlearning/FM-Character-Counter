"use client"
import { useState } from "react";
import CustomCheckbox from "./input/customCheckbox";
import CustomInput from "./input/customInput";

type CharacterLimitProps = {
    limit: number;
    setLimit: (limit: number) => void;
}
const defaultLimit = 300;
export default function CharacterLimit(
    { limit = defaultLimit, setLimit }: CharacterLimitProps
) {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (checked: boolean) => {
        if (!checked) setLimit(defaultLimit);
        setIsChecked(checked);
    }
    const handleInputChange = (value: string) => {
        const newLimit = parseInt(value) > 0 ? parseInt(value) : defaultLimit;
        setLimit(newLimit);
    }
    return (
        <div className=" flex items-center gap-2">
            <CustomCheckbox
                label="Set Character Limit"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            {isChecked && <CustomInput
                onChange={handleInputChange}
                value={limit.toString()}
            />}

        </div>
    )
}
