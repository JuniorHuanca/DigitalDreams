import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { useSession } from 'next-auth/react'
import Loader from '../Loaders/Loader';
interface ISession {
    data: any;
    status: string;
}
interface Props {
    children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
    const { data: session, status }: ISession = useSession()
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    if (status === "loading") {
        <Loader />
    }
    console.log(session)
    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <Box flexGrow={1}>
                <Navbar
                    user={session?.user}
                // isSidebarOpen={isSidebarOpen}
                // setIsSidebarOpen={setIsSidebarOpen}
                />
                {children}
            </Box>
        </Box>
    )
}

export default Layout