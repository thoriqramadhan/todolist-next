'use client'
/* eslint-disable @typescript-eslint/no-empty-object-type */
import AppIcon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleIcons from '@/components/ui/Icons';
import { ErrorInput, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Loading from '@/components/ui/Loading';
import { register } from '@/lib/action/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useActionState, useEffect, useState } from 'react';

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
    const router = useRouter()
    const [formState, formAction, isPending] = useActionState(register, '')
    const [username, setUsername] = useState<FormRegisterData | string>(formState?.data?.username ?? '')
    const [email, setEmail] = useState<FormRegisterData | string>(formState?.data?.email ?? '')

    useEffect(() => {
        if (formState?.success) {
            router.push('/dashboard')
        }
    }, [formState])
    return (
        <div className="'w-full h-screen *:div:px-6">
            <form action={formAction}>
                <Card className='h-full flex flex-col md:h-fit md:max-w-md p-0'>
                    <CardHeader className='flex flex-col items-center'>
                        <AppIcon size={60} />
                        <CardTitle className='text-xl'>Register</CardTitle>
                        <CardDescription>Register to acces Todo List app.</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3 flex-1 md:flex-none'>
                        <Label htmlFor="username" className='text-lg font-medium block'>Username</Label>
                        <Input type='text' name='username' id='username' autoComplete='off' placeholder='User' required value={username} onChange={(e) => setUsername(e.target.value)} />
                        {formState?.error?.username && <ErrorInput>{formState?.error?.username ?? ''}</ErrorInput>}
                        <Label htmlFor="email" className='text-lg font-medium block'>Email</Label>
                        <Input type='email' name='email' id='email' autoComplete='off' placeholder='user@gmail.com' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        {formState?.error?.email && <ErrorInput>{formState?.error?.email ?? ''}</ErrorInput>}
                        <Label htmlFor="password" className='text-lg font-medium block'>Password</Label>
                        <Input type='password' name='password' id='password' autoComplete='off' required />
                        {formState?.error?.password && <ErrorInput>{formState?.error?.password ?? ''}</ErrorInput>}
                    </CardContent>
                    <CardFooter>
                        <Button className='w-full disabled:cursor-not-allowed' disabled={isPending} >{isPending ? <Loading /> : 'Register'}</Button>
                    </CardFooter>
                </Card>
            </form>
            <div className="px-6">
                <Button className='w-full space-x-4 disabled:cursor-not-allowed' disabled={isPending}><GoogleIcons /> Google</Button>
            </div>
            <div className="flex justify-end w-full px-6">

                <Link href={'/login'} className='text-xs underline cursor-pointer'>Already have an account?</Link>
            </div>
        </div>
    )
}
export default Page;