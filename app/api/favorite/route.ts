import { NextRequest, NextResponse } from 'next/server';
import serverAuth from '../../../lib/serverAuth';
import prismadb from '@/lib/prismadb';
import { without } from 'lodash';


export async function POST(req: NextRequest) {
    try {
        const currentUser = await serverAuth(req);
        const { movieId } = await req.json();
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if (!movie) {
            throw new Error('Invalid movie ID');
        }

        const user = await prismadb.user.update({
            where: {
                email: currentUser.email || '',
            },
            data: {
                favoriteIds: {
                    push: movieId,
                }
            }
        });

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.log(error);
        // Return a 400 Bad Request response in case of an error
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const currentUser = await serverAuth(req);
        const { movieId } = await req.json();
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if (!movie) {
            throw new Error('Invalid movie ID');
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

        const user = await prismadb.user.update({
            where: {
                email: currentUser.email || '',
            },
            data: {
                favoriteIds: updatedFavoriteIds,
            }
        })

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.log(error);
        // Return a 400 Bad Request response in case of an error
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
}