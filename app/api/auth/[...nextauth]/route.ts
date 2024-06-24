import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismadb from '../../../../lib/prismadb';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
// Directly use NextAuth with your authOptions in the export
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
