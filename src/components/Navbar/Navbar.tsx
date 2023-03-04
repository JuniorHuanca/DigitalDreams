import {
    LightModeOutlined,
    DarkModeOutlined,
    AccountCircle,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined
} from "@mui/icons-material"
import { useEffect, useState } from "react";
import FlexBetween from "../FlexBetween";
import { setMode } from "@/state"
import profileImage from "@/assets/profile.jpeg"
import { signIn, signOut } from "next-auth/react"
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
import UserProfile from "../Modals/UserProfile";
import { useTheme as tailWindTheme } from 'next-themes'
import NavButton from "./NavButton";
import { WiSolarEclipse } from 'react-icons/wi';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft, BsMoon, BsFilePersonFill } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from "react-icons/md";

type Props = {
    user: any
}

const Navbar = ({ user }: Props) => {
    const dispatch = useDispatch();
    const themeM: ITheme = useTheme();
    const { theme, setTheme } = tailWindTheme()
    const [mounted, setMounted] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event: any) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) return null
    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
            className="h-[10vh]"
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* LEFT SIDE */}
                <FlexBetween>
                    {/* <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton> */}
                    <FlexBetween
                        backgroundColor={themeM.palette.background.alt}
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
                <div className="flex">
                    <NavButton title="Cart" customFunc={() => {
                        dispatch(setMode())
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }} color={themeM.palette.secondary[200]} icon={themeM.palette.mode === "dark" ? (
                        <BsMoon />
                    ) : (
                        <WiSolarEclipse />
                    )} dotColor={undefined} />
                    <NavButton title="Cart" customFunc={() => handleClick('cart')} color={themeM.palette.secondary[200]} icon={<FiShoppingCart />} dotColor={undefined} />
                    <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={themeM.palette.secondary[200]} icon={<BsChatLeft />} />
                    <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={themeM.palette.secondary[200]} icon={<RiNotification3Line />} />
                    {!user &&
                        <NavButton title="person" customFunc={() => handleClick('person')} color={themeM.palette.secondary[200]} icon={<BsFilePersonFill />} dotColor={undefined} />
                    }
                    <div
                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                        onClick={() => handleClick('userProfile')}
                    >
                        {user &&
                            <>
                                <img
                                    className="rounded-full w-8 h-8"
                                    src={user?.image}
                                    alt="user-profile"
                                />
                                <p>
                                    <span className={`text-[${themeM.palette.secondary[100]}] text-14`}>Hi,</span>{' '}
                                    <span className={`text-[${themeM.palette.secondary[100]}] font-bold ml-1 text-14`}>
                                        {user?.name}
                                    </span>
                                </p>
                                <MdKeyboardArrowDown className="text-gray-400 text-14" />
                            </>

                        }
                    </div>
                    {/* {isClicked.cart && (<Cart />)}
                    {isClicked.chat && (<Chat />)}
                    {isClicked.notification && (<Notification />)}
                    {isClicked.userProfile && (<UserProfile />)} */}
                    <UserProfile user={user} />
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar