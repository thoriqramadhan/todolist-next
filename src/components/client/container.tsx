'use client'
import { FC, useRef, useState } from 'react';
import { TodoCard } from '../TodoCard';
import { ProgressPercentage } from '../server/card';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { Button } from '../ui/button';
import { TagForm } from './Form';
import { Trash2, PencilIcon } from 'lucide-react';

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
    const [selectedTag, setSelectedTag] = useState('')
    console.log(tags);

    function selectHandler(value) {
        setSelectedTag(value)
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
                                    {tags.map(tag => (
                                        <SelectItem key={tag.id} value={tag.name}>{tag.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className='w-full flex gap-3 flex-wrap overflow-y-auto max-h-[200px]'>
                            {tags.map(tag => (
                                <span key={tag.id} className='inline-block text-sm tracking-wider text-zinc-500 px-3 py-1 rounded-lg shadow-sm border bg-white cursor-pointer transition-300 hover:font-semibold'>{tag.name}</span>
                            ))}
                        </div>
                        <p className='text-description'>Click the tag to see todos with the relative tag!.</p>
                    </>
                )}

            </div>
            {selectedTag &&
                <div className="w-full">
                    <h2 className='text-subtitle'>Selected Tags To Edit</h2>
                    <section className='w-full flex py-1 transition-300 hover:bg-zinc-100 justify-between items-center'>
                        <p>{selectedTag}</p>

                        <span className='flex gap-x-2'>
                            <Button><PencilIcon /></Button>
                            <Button><Trash2 /></Button>
                        </span>
                    </section>
                </div>
            }
            <TagForm />
        </div>
    </>
}