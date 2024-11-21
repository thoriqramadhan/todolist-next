import { getTodoDB } from "@/helpers/dbHelpers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const todos = await getTodoDB()
        return  NextResponse.json({todos} , {status:200})
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }
}