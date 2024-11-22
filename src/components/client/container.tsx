'use client'
import { FC, useRef, useState } from 'react';
import { TodoCard } from '../TodoCard';
import { ProgressPercentage } from '../server/card';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { TagForm } from './Form';

interface TodoCardContainerProps {

}

export const TodoCardContainer = ({ todos }) => {
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

interface TagsContainerProps {
    tagsData: Tag[]
}

export const TagsContainer: FC<TagsContainerProps> = ({ tagsData }) => {
    const [tags, setTags] = useState(tagsData);
    function selectHandler(value) {
        console.log(value);

    }
    return <>
        <div className="w-full space-y-5"
        >
            <div className="w-full space-y-3">
                <h1 className='text-subtitle'>{tagsData.length === 0 && 'No'} Available Tags</h1>
                {tagsData.length > 0 && (
                    <>
                        <Select onValueChange={selectHandler}>
                            <SelectTrigger className='w-full' >
                                <SelectValue defaultValue={'test'} placeholder='Select Tags' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tags</SelectLabel>
                                    <SelectItem value='test' >test1</SelectItem>
                                    <SelectItem value='tes2' >test2</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className='w-full flex gap-3 flex-wrap overflow-y-auto max-h-[200px]'>
                            <span className='inline-block text-sm tracking-wider text-zinc-500 px-3 py-1 rounded-lg shadow-sm border bg-white cursor-pointer transition-300 hover:font-semibold'>Sports</span>
                        </div>
                    </>
                )}

            </div>
            <TagForm />
        </div>
    </>
}