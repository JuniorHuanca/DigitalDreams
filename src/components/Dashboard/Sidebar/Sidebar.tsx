import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import FlexBetween from "@/components/FlexBetween";
import { useRouter } from "next/router";
import { navItems } from "@/shared/util/data";
import { ITheme } from "@/shared/util/types";
import Image from "next/image";
import Avatar from "react-avatar";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Link from "next/link";
type Props = {
  user: any;
  // {
  //     name:string,
  //     occupation: string,
  // },
  drawerWidth: any;
  isSidebarOpen: any;
  setIsSidebarOpen: any;
  isNonMobile: any;
};

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}: Props) => {
  const router = useRouter();
  const { pathname } = router;
  const [active, setActive] = useState<string>("");
  const [errorImage, setErrorImage] = useState<boolean>(false);
  const theme: ITheme = useTheme();
  useEffect(() => {
    const parts = pathname.split("/");
    setActive(parts[parts.length - 1]);
  }, [pathname]);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    <Link href="/">DIGITALDREAMS</Link>
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        lcText === "dashboard"
                          ? router.push(`/dashboard`)
                          : router.push(`/dashboard/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box bottom="1rem" mb="1.5rem">
            <Divider />
            <FlexBetween textTransform="none" m="1.5rem 0 0 1.5rem">
              <Box
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
                overflow="hidden"
              >
                {user?.image && !errorImage ? (
                  <Image
                    className="rounded-full w-8 h-8"
                    src={user?.image}
                    alt="user"
                    width={32}
                    height={32}
                    onError={() => setErrorImage(true)}
                    priority
                  />
                ) : (
                  <Avatar name={user && user.name} size="40" round={true} />
                )}
              </Box>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user?.role}
                </Typography>
              </Box>
              {user?.role === "Admin" && (
                <AdminPanelSettingsOutlinedIcon
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px ",
                  }}
                />
              )}
              {user?.role === "Manager" && (
                <SecurityOutlinedIcon
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px ",
                  }}
                />
              )}
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
