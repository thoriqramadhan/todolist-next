import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await prisma.todo.deleteMany()
        await prisma.todoTag.deleteMany()
        return new NextResponse('success delete all' ,{ status:200})
    } catch (error) {
        return new NextResponse('failed delete all' ,{ status:400})
    }
}