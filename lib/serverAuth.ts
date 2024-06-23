import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import prismadb from './prismadb';
import { NextRequest } from 'next/server';

const serverAuth = async (req: NextRequest) => {
    const session = await getServerSession({ req, ...authOptions });

    if (!session?.user?.email) {
        throw new Error('Not signed in.');
    }

    const currentUser = await prismadb.user.findUnique({
        where: { email: session.user.email },
    });

    if (!currentUser) {
        throw new Error('Not signed in.');
    }

    return currentUser;
}

export default serverAuth;
