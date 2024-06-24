
import { NextRequest, NextResponse } from 'next/server';
import serverAuth from '../../../../lib/serverAuth';
import prismadb from '@/lib/prismadb';


export async function GET(req: NextRequest) {
    try {
        await serverAuth(req);
        const url = new URL(req.url);
        const pathnameParts = url.pathname.split('/');
        const movieId = pathnameParts[pathnameParts.length - 1];
        if (typeof movieId !== "string") {
            throw new Error('Invalid ID');
        }

        if (!movieId) {
            throw new Error('Invalid ID');
        }
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });
        if (!movie) {
            throw new Error('Invalid ID');
        }
        // Return the current user with a 200 OK response
        return NextResponse.json(movie, { status: 200 });
    } catch (error) {
        console.log(error);
        // Return a 400 Bad Request response in case of an error
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
}
