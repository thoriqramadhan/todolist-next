import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createTodo } from '@/lib/action/todo-crud';
import { Label } from '@radix-ui/react-label';
import { FC } from 'react';

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
    return <form action={createTodo} className='grid gap-5 w-full grid-cols-4'>
        <h1 className='text-title col-span-4'>Create Todo</h1>
        <section className='col-span-2 flex flex-col'>
            <Label htmlFor="title" className='text-lg font-medium block'>Title</Label>
            <Input type='text' name='title' id='title' autoComplete='off' placeholder='Workout' required />
        </section>
        <section className='col-span-2 flex flex-col'>
            <Label htmlFor="priority" className='text-lg font-medium block'>Priority</Label>
            <Input type='text' name='priority' id='priority' autoComplete='off' placeholder='Important' />
        </section>
        <section className='col-span-2 flex flex-col'>
            <Label htmlFor="deadline" className='text-lg font-medium block'>Deadline</Label>
            <Input type='datetime-local' name='deadline' id='deadline' className='w-full' autoComplete='off' required />
        </section>
        <Button className=' col-span-4 space-x-4 disabled:cursor-not-allowed'>Create</Button>
        {/* {!!formState?.error?.email && <ErrorInput>{formState?.error?.email ?? ''}</ErrorInput>} */}
    </form>
}

export default Page;