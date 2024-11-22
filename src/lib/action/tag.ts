'use server'

import { cookies } from "next/headers";
import { prisma } from "../db";
import { decryptSession } from "../session";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createTag(formData: FormData) {
    try {
        const cookieStore = await cookies()
        const session = cookieStore.get('session')
        if (!session) {
            return {message: 'Unauthorized' , status:400}
        }
        const name = formData.get('name') as string;
        if (!name) {
            return {message: 'bruh rly?' , status:400}
        }
        await prisma.todoTag.create({
            data: {
                name: name
            }
        })
        return {message: 'success' , status:200}
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code == 'P2002') {
                return {message: `Tag name is duplicate!` , status: 400}
            }
        } else {
            return {message: `Failed to create tags` , status: 400}
        }
    }
}