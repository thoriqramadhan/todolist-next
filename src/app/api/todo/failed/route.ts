import { updateTodo } from "@/helpers/dbHelpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { id } = body;
        if (!id) {
            return new NextResponse('Invalid payload' , {status:400})
        }
        const updateData = { status: 'failed' }
        await updateTodo(id, updateData)
        return new NextResponse('success' , {status:200})
    } catch (error) {
        return new NextResponse('failed to update' , {status:500})
    }
}