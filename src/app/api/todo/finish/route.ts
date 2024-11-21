import { updateTodo } from "@/helpers/dbHelpers";
import { formatToISO } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { id } = body
        if (!id) {
            return new NextResponse('invalid payload' , {status:400})
        }
        const dataToUpdate = {status: 'finished' , finishedAt: new Date(formatToISO(Date.now()) )}
        await updateTodo(id, dataToUpdate)
        return new NextResponse('success' , {status:200})
    } catch (error) {
        return new NextResponse('failed to do request!' , {status:500})
    }
}