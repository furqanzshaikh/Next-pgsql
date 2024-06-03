import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
    const { id } = params;
    const { title, description, content } = await req.json();

    try {
        const existingBlog = await prisma.Blog.findUnique({
            where: {
                id: parseInt(id), // Ensure id is an integer
            },
        });

        if (!existingBlog) {
            return NextResponse.json({ success: false, error: "Record to update not found." });
        }

        const updatedUser = await prisma.Blog.update({
            where: {
                id: parseInt(id), // Ensure id is an integer
            },
            data: {
                title,
                description,
                content,
            },
        });

        return NextResponse.json({ success: true, updatedUser });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
