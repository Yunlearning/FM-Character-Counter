function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return function (...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
//     let timeout: NodeJS.Timeout;

//     return function (...args: Parameters<T>) {
//         // 需要類型檢查或斷言才能使用 args
//         if (args.some((arg) => typeof arg !== 'string')) {
//             throw new Error('參數必須是字符串');
//         }
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func(...(args as any)), delay); // 這裡需要 any 作為臨時解決
//     };
// }

function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
    let inThrottle: boolean = false;

    return function (...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

export const DecimalPrecision = (function () {
    // Polyfill for Math.trunc if it doesn't exist
    if (Math.trunc === undefined) {
        Math.trunc = function (v: number): number {
            return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
    }

    // Define the type for adjustment methods
    type AdjustType = 'round' | 'ceil' | 'floor' | 'trunc';

    // Decimal adjustment function with proper typing
    const decimalAdjust = function (type: AdjustType, num: number, decimalPlaces: number): number {
        if (type === 'round' && num < 0) {
            return -decimalAdjust(type, -num, decimalPlaces);
        }

        const shift = function (value: number, exponent: number): number {
            const valueParts = (value + 'e').split('e');
            return +(valueParts[0] + 'e' + (+valueParts[1] + (exponent || 0)));
        };

        const n = shift(num, +decimalPlaces);
        return shift(Math[type](n), -decimalPlaces);
    };

    // Return object with typed methods
    return {
        // Decimal round (half away from zero)
        round: function (num: number, decimalPlaces: number): number {
            return decimalAdjust('round', num, decimalPlaces);
        },

        // Decimal ceil
        ceil: function (num: number, decimalPlaces: number): number {
            return decimalAdjust('ceil', num, decimalPlaces);
        },

        // Decimal floor
        floor: function (num: number, decimalPlaces: number): number {
            return decimalAdjust('floor', num, decimalPlaces);
        },

        // Decimal trunc
        trunc: function (num: number, decimalPlaces: number): number {
            return decimalAdjust('trunc', num, decimalPlaces);
        },

        // Format using fixed-point notation
        toFixed: function (num: number, decimalPlaces: number): string {
            return decimalAdjust('round', num, decimalPlaces).toFixed(decimalPlaces);
        },
    };
})();

// You could also define an interface for the returned object
export interface DecimalPrecisionInterface {
    round: (num: number, decimalPlaces: number) => number;
    ceil: (num: number, decimalPlaces: number) => number;
    floor: (num: number, decimalPlaces: number) => number;
    trunc: (num: number, decimalPlaces: number) => number;
    toFixed: (num: number, decimalPlaces: number) => string;
}

export const textNoSpace = (text: string): string => text.replace(/\s/g, '');

// Usage example:
// const result: number = DecimalPrecision.round(3.14159, 2); // 3.14
// const fixed: string = DecimalPrecision.toFixed(3.14159, 2); // "3.14"

export { debounce, throttle };
