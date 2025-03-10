"use client"

import { useState, useEffect } from "react";

type ReadingTimeProps = {
    totalLength: number;
}
function transReadTime(minute: number, remainder: number) {
    if (minute === 0) {
        return '0';
    }
    if (remainder > 0) {
        return `<${minute}`;
    } else {
        return `${minute}`;
    }
}

export default function ReadingTime({ totalLength }: ReadingTimeProps) {
    const minute = Math.ceil(totalLength / 100);
    // const minute = totalLength / 10;
    const remainder = totalLength % 10;
    const [time, setTime] = useState('0');
    // setTime();
    useEffect(() => {
        setTime(transReadTime(minute, remainder));
    }, [totalLength, minute, remainder]);
    return (
        <div className="text-preset-4 leading-preset-2 tracking-counter-2">Approx. reading time: {time} minute</div>
    )
}