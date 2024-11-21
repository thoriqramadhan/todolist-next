'use server'

import { prisma } from "../db";
import { decryptSession } from "../session";
import { cookies } from "next/headers";
import { getUserDB } from "@/helpers/dbHelpers";
import { formatToISO } from "../utils";


export async function createTodo(test: FormData) {
    try {
        const session = (await cookies()).get('session')
        const payload = await decryptSession(session?.value)
        if (!payload) {
            return new Error('Unauthorized');
        }
        const user = await getUserDB(payload.user.email)
        if (!user) {
            throw new Error('User not found');
        }
        const title = test.get('title') as string
        const start =  new Date(formatToISO(Date.now()) )
        const deadline = new Date( test.get('deadline') as string );
        const status = 'ongoing' as string;

        await prisma.todo.create({
            data: {
                title,
                start,
                deadline,
                status,
                userId: user!.id
            }
        })
    } catch (error) {
         console.log(error);
    }
}