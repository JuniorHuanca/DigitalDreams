import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';

interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // const userId = useSelector((state) => state.global.userId);
    // const { data } = useGetUserQuery(userId);
    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <Sidebar
                user={{}}
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar
                    user={{}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                {children}
            </Box>
        </Box>
    );
};

export default Layout