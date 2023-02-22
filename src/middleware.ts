import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
    function middleware(request: NextRequest) {
        return NextResponse.rewrite(new URL(request.url))
    },
    {
        callbacks: {
            authorized({ req, token }: { req: any, token: any }) {
                // const { path } = req.query;

                // if (path && path.startsWith("/")) {
                //     // Elimina la barra inicial si está presente
                //     path = path.slice(1);
                // }

                // if (path === "" || path?.startsWith("dashboard")) {
                //     // Si la ruta está vacía o comienza con "dashboard", verifica el valor de la propiedad "role" del token
                //     return token?.role === "Admin";
                // } else {
                //     // De lo contrario, solo verifica si el token existe
                //     return !!token;
                // }

                console.log(token)
                // `/admin` requires admin role
                if (req.nextUrl.pathname === "/dashboard") {
                    return token?.role === "Admin"
                }
                // `/me` only requires the user to be logged in
                return !!token
            },
        },
    }
)

export const config = { matcher: ["/dashboard/:patch*", "/buy"] }