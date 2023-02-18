// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
interface IProvider {
    clientId: string,
    clientSecret: string,
}
// export const authOptions = {
//     // Configure one or more authentication providers
//     providers: [
//         GithubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//         } as provider),
//         // ...add more providers hereF
//     ],
//     callbacks: {
//         session: async({ token, session }: { token: any, session: any }) => {
//     if (session?.user && token?.sub) {
//         session.user.id = token.sub
//     }
//     //
//     return session
// },
//         // jwt: async (params) => {
//         //     // update token
//         //     const { admin } = await prisma.user.findUnique({
//         //         where: {
//         //             email: params.token.email,
//         //         },
//         //         select: {
//         //             admin: true,
//         //         },
//         //     })
//         //     params.token.admin = admin
//         //     if (params.isNewUser === true) {
//         //         emailProvider(params.token.email, params.token.email)
//         //     }
//         //     return params.token
//         // },
//     }
// }

// export default NextAuth(authOptions)
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        } as IProvider),
    ],
})