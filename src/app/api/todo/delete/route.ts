import { deleteTodo } from "@/helpers/dbHelpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log(body)
        const { id } = body;
        console.log("ID yang diterima:", id);
        await deleteTodo(id)
        return new NextResponse('Success' , {status:200})
    } catch (error) {
        return new NextResponse('failed to delete' , {status: 500})
    }
}