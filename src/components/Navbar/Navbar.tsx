import {
    LightModeOutlined,
    DarkModeOutlined,
    AccountCircle,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined
} from "@mui/icons-material"
import { useState } from "react";
import FlexBetween from "../FlexBetween";
import { setMode } from "@/state"
import profileImage from "@/assets/profile.jpeg"
import { useDispatch } from "react-redux"
import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
} from "@mui/material";
import Image from "next/image";
import { ITheme } from "@/shared/util/types";
import Link from "next/link";
type Props = {
    user: any
    // isSidebarOpen: boolean,
    // setIsSidebarOpen: (value: boolean) => void;
}

const Navbar = ({ user }: Props) => {
    const dispatch = useDispatch();
    const theme: ITheme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event: any) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* LEFT SIDE */}
                <FlexBetween>
                    {/* <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton> */}
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/* RIGHT SIDE */}
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px" }} />
                    </IconButton>

                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            {!user &&
                                <IconButton>
                                    <AccountCircle />
                                </IconButton>
                            }
                            {user &&
                                <>
                                    <Box
                                        height="32px"
                                        width="32px"
                                        borderRadius="50%"
                                        sx={{ objectFit: "cover" }}
                                        overflow="hidden"
                                    >
                                        <img alt="profile" src={user?.image} height={32} width={32} />
                                    </Box>
                                    <Box textAlign="left">
                                        <Typography
                                            fontWeight="bold"
                                            fontSize="0.85rem"
                                            sx={{ color: theme.palette.secondary[100] }}
                                        >
                                            {user?.name}
                                        </Typography>
                                        {/* <Typography
                                    fontSize="0.75rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.occupation}
                                </Typography> */}
                                    </Box>
                                </>

                            }
                            <ArrowDropDownOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            {user && <MenuItem><Link href="/api/auth/signout">Log Out</Link></MenuItem>}
                            {!user && <MenuItem><Link href="/api/auth/signin">Log In</Link></MenuItem>}
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar