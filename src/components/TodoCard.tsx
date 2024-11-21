import { Check, Trash, Undo2 } from 'lucide-react';
import Timer from './Timer';
import { Dispatch, FC, SetStateAction } from 'react';
import { cn } from '@/lib/utils';
interface TodoCardProps {
    todo: {
        id?: number,
        status: string,
        title: string,
        start: Date,
        deadline: Date,
        endDate: Date | null
    },
    setter: Dispatch<SetStateAction<never[]>>
}
export const TodoCard: FC<TodoCardProps> = ({ todo, setter }) => {
    const { id, status, title, start, deadline, endDate } = todo;
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
                body: JSON.stringify(id)
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            setter(prev => prev.filter(todo => {
                if (todo.id == id) {
                    todo.status = 'ongoing'
                    return todo
                }
                return todo
            }))
        } catch (error) {
            console.log(error);

        }
    }
    async function finishHandler() { }
    return (
        <div className="w-full">
            <div className="w-full h-28 bg-gra-50 shadow-md p-3 rounded-lg border relative">
                <h1 className='font-medium tracking-wider mb-1'>{title}  -   <span className={cn('text-xs tracking-widest text-white p-1 rounded-full', { 'bg-green-400': status == 'finished', 'bg-yellow-400': status == 'ongoing' })}>{status}</span></h1>
                <Timer startDate={start} deadline={deadline} />
                {/* <p className='text-xs text-zinc-400'>{formattedStart} - {formattedDeadline}</p> */}
                <div className="flex absolute top-5 right-3 gap-x-3">
                    {status == 'finished' ? <Undo2 size={20} className='cursor-pointer' onClick={redoHandler} /> : <Check size={20} className='cursor-pointer' onClick={finishHandler} />}
                    <Trash size={20} className='cursor-pointer' onClick={deleteHandler} />
                </div>
            </div>
        </div>
    )
}