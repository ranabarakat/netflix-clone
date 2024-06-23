import { NextRequest } from 'next/server';

import prismadb from '@/lib/prismadb';
import serverAuth from '../../../lib/serverAuth';

export async function GET(req: NextRequest) {
    try {
        await serverAuth(req);
        const movieCount = await prismadb.movie.count();
        const randomIdx = Math.floor(Math.random() * movieCount);
        const randomMovies = await prismadb.movie.findMany({ take: 1, skip: randomIdx });
        return Response.json(randomMovies[0], { status: 200 });

    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Something went wrong.' }, { status: 400 });
    }
}
