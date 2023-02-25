import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"
interface IProvider {
    clientId: string,
    clientSecret: string,
}

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        } as IProvider),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        } as IProvider)
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        session: async ({ token, session }: { token: any, session: any }) => {
            // console.log(token, session)
            if (session?.user && token?.sub) {
                session.user.id = token.sub
            }
            //
            return session
        },
        async jwt(params: any) {
            const { role }: any = await prisma.user.findUnique({
                where: {
                    email: params.token.email,
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
})