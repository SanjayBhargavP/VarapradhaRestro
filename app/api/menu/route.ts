import { NextResponse } from 'next/server';
import prisma from '@/lib/db';  // ensure this path matches your folder structure

export async function GET() {
    try {
        // Fetch categories with their related items in one query
        const categories = await prisma.category.findMany({
            include: { menuItems: true },
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error in /api/menu:', error);
        return NextResponse.error();
    }
}