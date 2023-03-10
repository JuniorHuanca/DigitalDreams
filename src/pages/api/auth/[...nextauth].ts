import NextAuth, { NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prismadb"
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req): Promise<User | any> {
                console.log(credentials)
                const result = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credentials?.email },
                            { name: credentials?.email },
                        ],
                    },
                });
                console.log(result)
                if (!result) {
                    throw new Error('No user was found with that email. Please sign up.')
                }
                // compare()
                const checkPassword = await compare(
                    credentials?.password ?? '',
                    result.password ?? ''
                );

                if (!checkPassword) {
                    throw new Error('The password does not match.')
                }

                // incorrect password
                if (!checkPassword) {
                    throw new Error('Username or password does not match.')
                }
                return result
            },
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" },
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({ session, token, user }: { session: any, token: any, user: any }) {
            if (session?.user && token?.sub) {
                session.user.id = token.sub
                session.user.role = token.role
            }
            return session
        },
        async jwt(params) {
            const { role }: any = await prisma.user.findUnique({
                where: {
                    email: params.token.email as string,
                },
                select: {
                    role: true,
                },
            })
            params.token.role = role
            // if (params.isNewUser === true) {
            //     emailProvider(params.token.email, params.token.email)
            // }
            return params.token
        },
    },
    pages: {
        signIn: '/auth/SignIn',
        // signOut: '/auth/SignOut',
        // error: '/auth/Error', // Error code passed in query string as ?error=
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
}

export default NextAuth(authOptions)