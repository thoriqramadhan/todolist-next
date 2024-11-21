'use client'
import { FC, useEffect, useState } from 'react';

interface TimerProps {
    startDate: Date,
    deadline: Date
}

const Timer: FC<TimerProps> = ({ startDate, deadline }) => {
    const [timeLeft, setTimeLeft] = useState("")
    useEffect(() => {
        const deadlineDate = new Date(deadline).getTime()
        const interval = setInterval(() => {
            const now = new Date().getTime()
            const difference = deadlineDate - now;
            if (difference <= 0) {
                clearInterval(interval)
                setTimeLeft('00:00:00')
                return;
            }
            const day = Math.floor(difference / (1000 * 60 * 60 * 24))
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft(`${day}d:${hours}h:${minutes}m:${seconds}s`)
        }, 1000)
        return () => clearInterval(interval);
    }, [])
    return <div className='text-xs text-red-400 mt-2'>{timeLeft}</div>;
}

export default Timer;