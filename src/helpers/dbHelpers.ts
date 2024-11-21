import { prisma } from "@/lib/db";

export async function getUserDB(emailToSearch: string) {
    try {
        return await prisma.user.findFirst({where: {email: emailToSearch} })
    } catch (error) {
        return false
    }
}
export async function getTodoDB() {
    try {
        return await prisma.todo.findMany()
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