'use client'

import React, { useActionState, useState } from "react"
import { Button } from "../ui/button"
import { ErrorInput, Input } from "../ui/input"
import { Label } from "../ui/label"
import { createTag } from "@/lib/action/tag"

export function TagForm() {
    const [errorMsg, setErrorMsg] = useState('')
    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);

        const response = await createTag(formData);
        if (response?.status == 400) {
            setErrorMsg(response.message)
            return;
        }
    }
    return (
        <form onSubmit={submitHandler} className="w-full max-h-fit gap-3 flex flex-col">
            <h1 className='w-full text-subtitle'>Create Tags</h1>
            <section className='md:w-1/2'>
                <Label htmlFor='name'>Name</Label>
                <Input type='text' name='name' id='name' />
                {errorMsg && <ErrorInput>{errorMsg}</ErrorInput>}
            </section>
            <Button className='md:w-1/2'>Create</Button>
        </form>
    )
}