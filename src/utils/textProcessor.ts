// utils/textProcessor.ts
export interface TextAnalysis {
    words: string[];
    sentences: string[];
    wordCount: number;
    sentenceCount: number;
    letterCount: CharCount;
}
export interface CharCount {
    [key: string]: number;
}
/**
 * 分析文本，提取單詞和句子
 * @param text 輸入的文本
 * @returns TextAnalysis 包含單詞數量和句子數量的分析結果
 */
export function analyzeText(text: string): TextAnalysis {
    if (!text) {
        return { words: [], sentences: [], wordCount: 0, sentenceCount: 0, letterCount: {} };
    }

    // 提取單詞
    const words = text
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ') // 移除標點符號
        .split(/\s+/) // 以多個空格分隔
        .filter((word) => word.length > 0); // 過濾空字符串

    // 提取句子
    const sentences = text
        .split(/([.!?]+(?:\s|$))/) // 分割句號、問號、感嘆號
        .filter((sentence) => sentence.trim().length > 0 && /[a-zA-Z]/.test(sentence)) // 過濾空字符串和非字母內容
        .map((sentence) => sentence.trim()); // 去除首尾空格
    const upperText = text.toUpperCase();
    const letterCount: CharCount = {};
    for (const char of upperText) {
        if (/[A-Z]/.test(char)) {
            letterCount[char] = (letterCount[char] || 0) + 1;
        }
    }
    return {
        words,
        sentences,
        wordCount: words.length,
        sentenceCount: sentences.length,
        letterCount,
    };
}
