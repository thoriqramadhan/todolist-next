'use server'

import { prisma } from "../db";
import { decryptSession } from "../session";
import { cookies } from "next/headers";
import { getTag, getUserDB } from "@/helpers/dbHelpers";
import { formatToISO } from "../utils";


export async function createTodo(todo: FormData) {
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
        const title = todo.get('title') as string
        const start =  new Date(formatToISO(Date.now()) )
        const deadline = new Date(todo.get('deadline') as string);
        const tag = todo.get('tag') as string;
        const tagDb = await getTag(tag) as Tag
        const status = 'ongoing' as string;

        await prisma.todo.create({
            data: {
                title,
                start,
                deadline,
                status,
                userId: user!.id,
                todoTagId: tagDb.id
            }
        })
    } catch (error) {
         console.log(error);
    }
}