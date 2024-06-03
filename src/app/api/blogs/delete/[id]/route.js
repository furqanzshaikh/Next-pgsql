import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        const deleteUser = await prisma.Blog.delete({
            where: {
                id: parseInt(id), // Ensure id is an integer
            },
        });
        return NextResponse.json({ success: true ,deleteUser});
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
