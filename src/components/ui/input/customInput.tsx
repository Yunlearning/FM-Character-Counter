
type CustomInputProps = {
    placeholder?: string;
    onChange: (value: string) => void;
    className?: string;
    disabled?: boolean;
    value?: string;
}

export default function CustomInput({
    className = '',
    value = '',
    onChange,
    placeholder = '',
    disabled = false,
}: CustomInputProps) {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        onChange(e.target.value);
    }
    return (
        <div className={`relative px-3 border-[1px] w-14  border-neutral-600 rounded-radius-6 ${className}`}>
            <input type="text"
                className={`outline-none text-center w-full`}
                placeholder={placeholder}
                onChange={handleInput}
                value={value}
                disabled={disabled}
            />
        </div>
    )
}