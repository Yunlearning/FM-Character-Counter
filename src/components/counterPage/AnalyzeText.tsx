'use client'
import ThemeToggle from "@/components/theme/ThemeToggle"
import { useState } from 'react';
import CharacterLimit from "../ui/CharacterLimit";
import ReadingTime from "../ui/ReadingTime";
import MessageArea from "../ui/MessageArea";
import ExcludeSpaces from "../ui/ExcludeSpaces";
import LogoLight from "@/assets/images/logo-light-theme.svg"
import LogoDark from "@/assets/images/logo-dark-theme.svg"
import CountCard from "../ui/CountCard";
import { TextAnalysis } from '@/utils/textProcessor';
import LetterDensity from "../ui/LetterDensity";
export default function AnalyzeText() {
    const [limit, setLimit] = useState(300);
    const [isExcludeSpaces, setIsExcludeSpaces] = useState(false);
    const [msg, setMsg] = useState('');
    const [analysis, setAnalysis] = useState<TextAnalysis>({
        words: [],
        sentences: [],
        wordCount: 0,
        sentenceCount: 0,
        letterCount: {}
    });
    const handleMsgChange = (value: string) => {
        setMsg(value);
    }
    // console.log('letterCount------', Object.entries(analysis.letterCount).sort());

    return (
        <ul
            className="
            container
            max-w-mobile tablet:max-w-tablet desktop:max-w-desktop
            grid grid-cols-1 desktop:gap-12 gap-10
            desktop:px-0 tablet:px-8 px-4
            dark:bg-neutral-900 bg-neutral-0
            dark:text-neutral-0 text-neutral-900
        "
        >
            <li className="flex justify-between items-center desktop:p-0 tablet:py-4 py-4">
                <div className="flex items-center gap-3">
                    <LogoLight className="dark:hidden w-auto tablet:h-[40px] h-[30px]" />
                    <LogoDark className='hidden dark:block w-auto tablet:h-[40px] h-[30px]' />
                </div>
                <ThemeToggle />
            </li>
            <li className="desktop:px-60 tablet:px-24">
                <h1 className="font-bold tablet:text-preset-1 text-preset-mobile-1 text-center leading-preset-1 tracking-counter-1">
                    Analyze your text in real-time.
                </h1>
            </li>
            <li className="grid grid-cols-1 gap-4 mobile:px-0 px-4">
                <div>
                    <MessageArea
                        value={msg}
                        minHeight={200}
                        onChange={handleMsgChange}
                        maxLength={limit}
                        onTextAnalysis={setAnalysis}
                    />
                </div>
                <div className="flex 
                tablet:flex-row flex-col 
                tablet:items-center items-start 
                tablet:justify-between 
                tablet:gap-6 gap-3
                ">
                    <div className="flex tablet:flex-row flex-col tablet:gap-6 gap-3">
                        <ExcludeSpaces
                            // value={msg}
                            // onChange={handleMsgChange}
                            isExcludeSpaces={isExcludeSpaces}
                            setIsExcludeSpaces={setIsExcludeSpaces}
                        />
                        <CharacterLimit
                            limit={limit}
                            setLimit={setLimit}
                        />
                    </div>
                    <ReadingTime totalLength={msg.length} />
                </div>
            </li>
            <li>
                <div className="flex flex-col gap-6">
                    <ul className="
                grid 
                tablet:grid-rows-1 grid-rows-3 
                tablet:grid-cols-3 grid-cols-1
                
                gap-4">
                        <li>
                            <CountCard
                                className="bg-counter-purple-400 "
                                label="Total Characters"
                                labelNoteShow={isExcludeSpaces}
                                labelNote=" (no space)"
                                msg={msg}
                                count={msg.length}
                                cardType="character"
                            />
                        </li>
                        <li>
                            <CountCard
                                className="bg-counter-yellow-500 "
                                label="Word Count"
                                count={analysis.wordCount}
                                cardType="word"
                            />
                        </li>
                        <li>
                            <CountCard
                                className="bg-counter-orange-500"
                                label="Sentence Count"
                                count={analysis.sentenceCount}
                                cardType="sentence"
                            />
                        </li>
                    </ul>
                    <div>
                        <li className="tablet:px-0 px-4">
                            <p className="text-preset-2 leading-preset-2 tracking-counter-1 font-bold">Letter Density</p>
                            {
                                msg.length > 0 ? <LetterDensity
                                    letterCount={analysis.letterCount}
                                    isNoSpaces={isExcludeSpaces}
                                    totalCaracters={msg}
                                /> : <p className="text-preset-4 leading-preset-2 tracking-counter-2 mt-5">No characters found. Start typing to see letter density.</p>
                            }

                        </li>
                    </div>
                </div>
            </li>

            {/* <li>
                <ul>
                    <li>
                        <Progress
                            label="A"
                            count={analysis.wordCount}
                            total={msg.length}
                        />
                    </li>
                </ul>
            </li> */}
        </ul>
    )
}