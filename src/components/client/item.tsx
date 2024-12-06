'use client'

import { ChangeEvent, useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import { updateTag } from "@/lib/action/tag";
import Loading from "@/app/dashboard/loading";
import { ErrorInput } from "../ui/input";

export function TagsItem({ selectedTag, setter, containerData }: { selectedTag: string, setter: [Dispatch<SetStateAction<string>>, Dispatch<SetStateAction<Tag[]>>], containerData: Tag[] }) {
    const inputRef = useRef()
    const [isEditMode, setIsEditMode] = useState(false)
    const [editState, setEditState] = useState(selectedTag)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    async function editHandler() {
        const newContainerData = containerData.map(item => {
            if (item.name == selectedTag) {
                item.name = editState
            }
            return item
        })
        if (isEditMode) {
            setLoading(true)
            try {
                await updateTag([selectedTag, editState]);
                setIsEditMode(prev => !prev)
                setter[0](editState)
                setter[1](newContainerData)
                setLoading(false)

            } catch (error) {
                setError(error)
                setLoading(false)
            }
            return;
        }
        setLoading(false)
        setIsEditMode(prev => !prev)
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.value.length == 0) {
            return;
        }
        setEditState(event.target.value)
    }
    useEffect(() => {
        if (isEditMode) {
            inputRef!.current!.focus()
        }
    }, [isEditMode])
    useEffect(() => {
        setEditState(selectedTag)
    }, [selectedTag])
    return (
        <div className="w-full">
            <h2 className='text-subtitle'>Selected Tags To Edit</h2>
            <section className='w-full flex py-1 transition-300 hover:bg-zinc-100 justify-between items-center'>
                <input type="text" name="selectedTags" id="selectedTags" value={editState} className='bg-transparent outline-none'
                    ref={inputRef} onChange={handleInputChange} disabled={!isEditMode} autoComplete='false' />

                <span className='flex gap-x-2'>
                    <Button onClick={editHandler} disabled={loading}>{loading ? <Loading /> : <PencilIcon />}</Button>
                    <Button><Trash2 /></Button>
                </span>
            </section>
            {error && <ErrorInput>{JSON.stringify(error)}</ErrorInput>}
        </div>
    )
}