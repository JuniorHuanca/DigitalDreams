import { DefaultSession } from 'next-auth'
import "next-auth/jwt"
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string
      address: string
      email: string
      image: string
      username: string
      password: string
      name: string
      role: string
    } & DefaultSession['user']
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    role?: "Admin"
  }
}