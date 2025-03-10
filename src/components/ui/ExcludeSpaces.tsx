import CustomCheckbox from "./input/customCheckbox";

type ExcludeSpacesProps = {
    // value: string;
    // onChange: (value: string) => void;
    isExcludeSpaces: boolean;
    setIsExcludeSpaces: (value: boolean) => void;
}
export default function ExcludeSpaces({
    // value,
    // onChange,
    isExcludeSpaces = false,
    setIsExcludeSpaces,
}: ExcludeSpacesProps) {
    // const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (checked: boolean) => {
        // if (checked) {
        //     const newValue = value.replace(/\s/g, '');
        //     onChange(newValue);
        // }
        setIsExcludeSpaces(checked);
    };
    return (
        <CustomCheckbox
            label="Exclude Spaces"
            checked={isExcludeSpaces}
            onChange={handleCheckboxChange}
        />
    )
}