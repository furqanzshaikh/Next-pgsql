import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { id } = params;
   

    try {
        const existingBlog = await prisma.Blog.findUnique({
            where: {
                id: parseInt(id), // Ensure id is an integer
            },
        });

        if (!existingBlog) {
            return NextResponse.json({ success: false, error: "Record to update not found." });
        }

      
        return NextResponse.json({ success: true, existingBlog });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
