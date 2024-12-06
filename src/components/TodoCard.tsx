'use client'
import { Check, Trash, Undo2 } from 'lucide-react';
import Timer from './Timer';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { cn, formatDate, formatToISO } from '@/lib/utils';
import { getTag, updateTodo } from '@/helpers/dbHelpers';
interface TodoCardProps {
    todo: {
        id?: number,
        status: string,
        title: string,
        start: Date,
        deadline: Date,
        finishedAt: Date | null,
        todoTagId: number
    },
    setter: Dispatch<SetStateAction<never[]>>
}
export const TodoCard: FC<TodoCardProps> = ({ todo, setter }) => {
    const [TodoData, setTodoData] = useState(todo)
    const { id, status, title, start, deadline, finishedAt } = TodoData;
    const [tag, setTag] = useState('')
    const deadlineConfig = status == 'failed' ? 0 : deadline;
    const [isDeadline, setIsDeadline] = useState(false)
    async function deleteHandler() {
        try {
            const response = await fetch('/api/todo/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            })
            if (response.ok) {
                setter(prev => prev.filter((item) => item.id !== id))
            } else {
                throw new Error('Failed to delete')
            }

        } catch (error) {
            console.log(error);
        }
    }
    async function redoHandler() {
        try {
            const response = await fetch('/api/todo/redo', {
                method: 'POST',
                body: JSON.stringify({ id })
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            setter(prev => prev.filter(todo => {
                if (todo.id == id) {
                    todo.status = 'ongoing'
                    todo.finishedAt = null
                    return todo
                }
                return todo
            }))
        } catch (error) {
            console.log(error);

        }
    }
    async function finishHandler() {
        try {
            const response = await fetch('/api/todo/finish', {
                method: 'POST',
                body: JSON.stringify({ id })
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }

            setter(prev => prev.filter(todo => {
                if (todo.id == id) {
                    todo.status = 'finished'
                    todo.finishedAt = new Date(formatToISO(Date.now()))
                    return todo
                }
                return todo
            }))
        } catch (error) {
            console.log(error);

        }
    }
    async function failedHandler(id) {
        try {
            const response = await fetch('/api/todo/failed', {
                method: 'POST',
                body: JSON.stringify({ id })
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            setTodoData({ ...TodoData, status: 'failed' })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        const tagInit = async () => {
            console.log('fetching ');
            const response = await fetch(`/api/tags/${todo.todoTagId}`)
            if (!response.ok) {
                return;
            }
            const parsedResponse = await response.json()
            setTag(parsedResponse.name)

        }
        tagInit()

    }, [])
    useEffect(() => {
        try {
            if (isDeadline) {
                failedHandler(id)
            }
        } catch (error) {
            console.log(error);
        }
    }, [isDeadline])
    return (
        <div className="w-full h-28 bg-gra-50 shadow-md p-3 rounded-lg border relative bg-white">
            <h1 className='font-medium tracking-wider mb-1'>{title}  -   <span className={cn('text-xs tracking-widest text-white p-1 rounded-full', { 'bg-green-400': status == 'finished', 'bg-yellow-400': status == 'ongoing', 'bg-red-500': status == 'failed' })}>{status}</span></h1>
            <Timer startDate={start} deadline={deadlineConfig} finishedAt={finishedAt} setter={[setIsDeadline, setTodoData]} />
            <p>{tag}</p>
            <div className="flex absolute top-5 right-3 gap-x-3">
                {isDeadline || status == 'failed' ? '' : status == 'finished' ? <Undo2 size={20} className='cursor-pointer' onClick={redoHandler} /> : <Check size={20} className='cursor-pointer' onClick={finishHandler} />}
                <Trash size={20} className='cursor-pointer' onClick={deleteHandler} />
            </div>
        </div>
    )
}