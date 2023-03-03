import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prismadb"

export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    providers: [
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
            }
            return session
        },
        // async jwt(params) {
        //     const { role }: any = await prisma.user.findUnique({
        //         where: {
        //             email: params.token.email as string,
        //         },
        //         select: {
        //             role: true,
        //         },
        //     })
        //     params.token.role = role
        //     // if (params.isNewUser === true) {
        //     //     emailProvider(params.token.email, params.token.email)
        //     // }
        //     return params.token
        // },
        async jwt({ token }) {
            token.role = "Admin"
            return token
        },
    },
    // pages: {
    // signIn: '/auth/SignIn',
    // signOut: '/auth/SignOut',
    // error: '/auth/Error', // Error code passed in query string as ?error=
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    // },
}

export default NextAuth(authOptions)