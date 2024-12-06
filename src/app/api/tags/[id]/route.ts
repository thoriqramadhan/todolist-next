import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest ,{params} : {params:Promise<{id :number}>}) {
    const id = (await params).id as string;
    const filteredId = parseInt(id)
    const tagDb = await prisma.todoTag.findFirst({ where: { id: filteredId } })
    return  NextResponse.json(tagDb , {status:200})
}