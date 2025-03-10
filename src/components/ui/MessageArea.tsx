import { debounce } from '@/utils/utils';
import { TextAnalysis, analyzeText } from '@/utils/textProcessor';
import { useRef, useEffect, useState, useCallback } from 'react';
import InfoIcon from '@/assets/images/icon-info.svg';

interface AutoResizeTextareaProps {
    value: string;
    onChange: (value: string) => void;
    minHeight?: number;
    className?: string;
    maxLength?: number;
    onTextAnalysis?: (analysis: TextAnalysis) => void; // 回調，傳回分析結果
}
export default function MessageArea({
    value,
    onChange,
    minHeight = 200,
    className = '',
    maxLength = 300,
    onTextAnalysis,
}: AutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [error, setError] = useState(false);
    const debouncedOnChange = debounce((newValue: string) => {
        // onChange(newValue);
        if (onTextAnalysis) {
            const analysis = analyzeText(newValue);
            onTextAnalysis(analysis);
        }
    }, 50);
    const handleError = useCallback((value: string) => {
        if (value.length === maxLength) {
            setError(true);
        }
        else {
            setError(false);
        }
    }, [maxLength]);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        debouncedOnChange(newValue);
        adjustHeight(e.target);
        handleError(newValue);
    }
    // 使用 debounce 優化高度調整
    const adjustHeight = debounce((element: HTMLTextAreaElement) => {
        element.style.height = 'auto';
        const newHeight = Math.max(minHeight, element.scrollHeight);
        element.style.height = `${newHeight}px`;
    }, 100); // 100ms 防抖延遲
    useEffect(() => {
        if (textareaRef.current) {
            adjustHeight(textareaRef.current);
            // // 設置最小高度
            // textareaRef.current.style.height = `${minHeight}px`;
            // // 根據內容調整高度
            // textareaRef.current.style.height = 'auto';
            // const newHeight = Math.max(
            //     minHeight,
            //     textareaRef.current.scrollHeight
            // );
            // textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [value, minHeight, adjustHeight])
    return (
        //
        <>
            <textarea
                ref={textareaRef}
                className={`resize-none p-4 outline-none
                    rounded-radius-12 w-full min-h-[200px]height-auto
                    border-2
                    ${error ? 'border-counter-orange-800 dark:border-counter-orange-500' : 'border-neutral-200 dark:border-neutral-700'}
                    ${error ? 'shadow-error-light dark:shadow-error-dark' : ''}
                    dark:bg-neutral-800 dark:text-neutral-200 
                    bg-neutral-100  text-neutral-900
                    text-preset-3 leading-preset-3 tracking-counter-2
                    dark:placeholder-neutral-200 placeholder-neutral-900
                    overflow-hidden
                    ${className}
                    `}
                style={{
                    minHeight: `${minHeight}px`,
                }}
                placeholder="Start typing here… (or paste your text)"

                value={value}
                onChange={handleChange}
                maxLength={maxLength}
            ></textarea>
            {
                error && (
                    <div className='flex items-center gap-2 text-preset-4 leading-preset-2 tracking-counter-2 text-counter-orange-500'>
                        <InfoIcon className="inline-block w-[14px] h-auto" />
                        <p>Limit reached! Your text exceeds 300 characters.</p>
                    </div>
                )
            }
        </>

    )

}

// export function AutoResizeTextarea({
//     value,
//     onChange,
//     // placeholder = '',
//     minHeight = 200,
//     className = '',
// }: AutoResizeTextareaProps) {
//     const textareaRef = useRef<HTMLTextAreaElement>(null);
//     // const [height, setHeight] = useState(minHeight);

//     useEffect(() => {
//         if (textareaRef.current) {
//             // 設置最小高度
//             textareaRef.current.style.height = `${minHeight}px`;
//             // 根據內容調整高度
//             textareaRef.current.style.height = 'auto';
//             const newHeight = Math.max(
//                 minHeight,
//                 textareaRef.current.scrollHeight
//             );
//             textareaRef.current.style.height = `${newHeight}px`;
//         }
//     }, [value, minHeight]); // 當 value 或 minHeight 改變時觸發

//     const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         onChange(e.target.value);
//     };

//     return (
//         <textarea
//             ref={textareaRef}
//             value={value}
//             onChange={handleChange}
//             // placeholder={placeholder}
//             className={`w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden resize-none ${className}`}
//             style={{ minHeight: `${minHeight}px` }}
//         />
//     );
// }