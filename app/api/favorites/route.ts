import { NextRequest, NextResponse } from 'next/server';
import serverAuth from '../../../lib/serverAuth';
import prismadb from '@/lib/prismadb';


export async function GET(req: NextRequest) {
    try {
        const currentUser = await serverAuth(req);
        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        });
        // Return the current user with a 200 OK response
        return NextResponse.json(favoriteMovies, { status: 200 });
    } catch (error) {
        console.log(error);
        // Return a 400 Bad Request response in case of an error
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
}
