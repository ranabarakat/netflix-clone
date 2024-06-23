import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "../../../../lib/prismadb";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { parseCookies } from 'nookies';


export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required.');
                }

                const user = await prismadb.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error('Email does not exist!');
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                if (!isCorrectPassword) {
                    throw new Error('Incorrect password!');
                }
                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: "jwt",
        // maxAge: 30 * 24 * 60 * 60, // Default to 30 days
    },
    // callbacks: {
    //     async session({ session, token }) {
    //         const cookies = parseCookies();
    //         if (cookies.rememberMe === 'true') {
    //             session.maxAge = 30 * 24 * 60 * 60; // Extend session to 30 days if 'Remember Me' is checked
    //         } else {
    //             session.maxAge = 24 * 60 * 60; // Default session to 24 hours
    //         }
    //         return session;
    //     }
    // },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,

};

// Define the handler function with proper types
const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    return await NextAuth(req, res, authOptions);
};

// Define the POST handler
export const POST = authHandler;

// Define the GET handler for other NextAuth.js routes
export const GET = authHandler;