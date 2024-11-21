'use client'
import { formatDate } from '@/lib/utils';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface TimerProps {
    startDate: Date,
    deadline: Date,
    finishedAt: Date
}

const Timer: FC<TimerProps> = ({ startDate, deadline, finishedAt }) => {
    const [timeLeft, setTimeLeft] = useState("")
    const [isFinished, setisFinished] = useState('')
    const classInit = 'text-xs mt-2'
    function formatFinishedAt() {
        if (!finishedAt) {
            setisFinished(finishedAt)
            return;
        }
        const formmatedDate = formatDate(new Date(finishedAt))
        setisFinished(formmatedDate)
        return;
    }
    useEffect(() => {
        formatFinishedAt()
        console.log('re render cuh');

    }, [finishedAt])
    useEffect(() => {
        if (finishedAt) {
            formatFinishedAt()
        }
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
    if (finishedAt) {
        return <div className={`${classInit} text-green-500`}><span className='text-black'>FinshedAt : </span>{isFinished}</div>
    }
    return <div className={`text-red-400 ${classInit}`}>{timeLeft}</div>;
}

export default Timer;