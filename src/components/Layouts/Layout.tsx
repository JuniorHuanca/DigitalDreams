import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { useSession } from 'next-auth/react'
import Loader from '../Loaders/Loader';
import Head from 'next/head';
import Footer from '../Footer/Footer';
interface ISession {
    data: any;
    status: string;
}
interface Props {
    children: React.ReactNode;
    tittle: string | undefined
}
const Layout = ({ children, tittle }: Props) => {
    const { data: session, status }: ISession = useSession()
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    if (status === "loading") {
        <Loader />
    }
    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <Head>
                <meta name="description" content="Encuentra los mejores productos tecnológicos en nuestro e-commerce: computadoras, ratones, teclados, y luces LED. Ofrecemos una amplia variedad de marcas y modelos, con características que se adaptan a las necesidades de cada usuario. Además, contamos con precios competitivos y un servicio de atención al cliente excepcional. ¡Visítanos y encuentra todo lo que necesitas para estar a la vanguardia de la tecnología!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{tittle}</title>
                <link rel="icon" href="/github.png" />
            </Head>
            <Box flexGrow={1}>
                <Navbar
                    user={session?.user}
                // isSidebarOpen={isSidebarOpen}
                // setIsSidebarOpen={setIsSidebarOpen}
                />
                {children}
                <Footer />
            </Box>
        </Box>
    )
}

export default Layout