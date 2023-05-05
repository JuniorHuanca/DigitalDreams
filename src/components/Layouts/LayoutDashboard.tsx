import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../Dashboard/Navbar/Navbar";
import { useSelector } from "react-redux";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "../Loaders/Loader";
import Head from "next/head";
interface ISession {
  data: any;
  status: string;
}
interface Props {
  children: React.ReactNode;
  title: string;
}

const LayoutDashboard = ({ children, title }: Props) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: session, status }: ISession = useSession();
  if (status === "loading") {
    <Loader />;
  }
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Head>
        <title>{title}</title>
      </Head>
      <Sidebar
        user={session?.user}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={session?.user}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {children}
      </Box>
    </Box>
  );
};

export default LayoutDashboard;
