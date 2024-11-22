import { prisma } from "@/lib/db";

export async function getUserDB(emailToSearch: string) {
    try {
        return await prisma.user.findFirst({where: {email: emailToSearch} })
    } catch (error) {
        return false
    }
}
export async function getTodoDB(options) {
    try {
        return await prisma.todo.findMany(options)
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function deleteTodo(id:number) {
    try {
        await prisma.todo.delete({ where: { id: id } })
        return true;
    } catch (error) {
        return error
    }
}

export async function updateTodo(id: number , dataObject: object) {
    try {
        await prisma.todo.update({
            where: {
                id: id
            },
            data: dataObject
        })
    } catch (error) {
        throw new Error('Failed to update todo!')
    }
}

export async function getTags() {
    try {
        return await prisma.todoTag.findMany() 
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}