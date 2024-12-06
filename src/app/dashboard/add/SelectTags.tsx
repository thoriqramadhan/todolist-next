'use client'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Value } from '@radix-ui/react-select'
import React, { useState } from 'react'

export default function SelectTags({ tagsArray }: { tagsArray: Tag[] }) {
    const [tagsSelected, setTagsSelected] = useState('')
    return (
        <>
            <Label htmlFor="deadline" className='text-lg font-medium block'>Tags</Label>
            <input type="hidden" name="tag" value={tagsSelected} />
            <Select onValueChange={(value) => setTagsSelected(value)}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Select a Tag" />
                </SelectTrigger>
                <SelectContent>
                    {tagsArray.length > 0 && tagsArray.map((tag, index) => (
                        <SelectItem value={tag.name} key={index}>
                            {tag.name}
                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>
        </>
    )
}
