'use client'
import { FC, useState } from 'react';
import { TodoCard } from '../TodoCard';
import { ProgressPercentage } from '../server/card';

interface TodoCardContainerProps {

}

const TodoCardContainer = ({ todos }) => {
    const [todoDatas, setTodoDatas] = useState(todos)
    return (
        <>
            <div className='w-full h-fit space-y-5'>
                <ProgressPercentage data={todoDatas} />
                {todoDatas.map((todo, index) => (
                    <TodoCard todo={todo} key={`${todo.title}-${index}-${+new Date()}`} setter={setTodoDatas} />
                ))}
            </div>
        </>
    )
}
export default TodoCardContainer;