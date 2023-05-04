import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useSession } from "next-auth/react";
import Loader from "../Loaders/Loader";
import Head from "next/head";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
interface ISession {
  data: any;
  status: string;
}
interface Props {
  children: React.ReactNode;
  title: string | undefined;
}
const Layout = ({ children, title }: Props) => {
  const { data: session, status }: ISession = useSession();
  const [mounted, setMounted] = useState<boolean>(false);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, [status, session]);

  if (status === "loading" || !mounted) {
    return <Loader />;
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
  );
};

export default Layout;
