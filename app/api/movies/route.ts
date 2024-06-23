import { NextRequest, NextResponse } from 'next/server';
import serverAuth from '../../../lib/serverAuth';
import prismadb from '@/lib/prismadb';


export async function GET(req: NextRequest) {
    try {
        await serverAuth(req);
        const movies = await prismadb.movie.findMany();
        // Return the current user with a 200 OK response
        return NextResponse.json(movies, { status: 200 });
    } catch (error) {
        console.log(error);
        // Return a 400 Bad Request response in case of an error
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
}
