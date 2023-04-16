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
    title: string | undefined
}
const Layout = ({ children, title }: Props) => {
    const { data: session, status }: ISession = useSession()
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    if (status === "loading") {
        <Loader />
    }
    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <Head>
                <title>{title}</title>
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