import {
  LightModeOutlined,
  DarkModeOutlined,
  AccountCircle,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import FlexBetween from "../FlexBetween";
import {
  handleClickModal,
  selectIsClicked,
  setMode,
  cleanupModals,
} from "@/state/globalSlice";
import profileImage from "@/assets/profile.jpeg";
import { signIn, signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
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
import { useTheme as tailWindTheme } from "next-themes";
import NavButton from "./NavButton";
import { WiSolarEclipse } from "react-icons/wi";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { BsChatLeft, BsMoon, BsFilePersonFill } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAppDispatch } from "@/state/store";
import Notification from "../Modals/Notification";
import Cart from "../Modals/Cart";
import Chat from "../Modals/Chat";
import useMediaQuery from "@/shared/util/useMediaQuery";
import CartMobile from "../Modals/CartMobile";
import ChatMobile from "../Modals/ChatMobile";
import NotificationMobile from "../Modals/NotificationMobile";
import UserProfileMobile from "../Modals/UserProfileMobile";
import Head from "next/head";
import Logo from "@/assets/img/Avatar.png";
import {
  allProducts,
  allProductsBySearch,
  getAllProducts,
  setProductsBysearch,
} from "@/state/products/products/productsSlice";
type Props = {
  user: any;
};

const Navbar = ({ user }: Props) => {
  const isClicked = useSelector(selectIsClicked);
  const products = useSelector(allProducts);
  const productsSearch = useSelector(allProductsBySearch);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const dispatch = useAppDispatch();
  const themeM: ITheme = useTheme();
  const { theme, setTheme } = tailWindTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [errorImage, setErrorImage] = useState(false);
  const handleModal = async (value: string) => {
    dispatch(handleClickModal(value));
  };
  useEffect(() => {
    setMounted(true);
    dispatch(getAllProducts());
  }, [isClicked]);
  if (!mounted) return null;
  console.log(productsSearch.length);

  const handleSearch = (e: any) => {
    const search = e.target.value;
    dispatch(setProductsBysearch({ products, search }));
  };
  const selectModalColor = "bg-slate-300 dark:bg-primary-600 px-2";
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
      className="h-[10vh] px-4"
    >
      {isAboveMediumScreens ? (
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <FlexBetween
            backgroundColor={themeM.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            className="relative"
          >
            <InputBase
              placeholder="Search..."
              onChange={(e) => {
                handleSearch(e);
              }}
            />
            <IconButton>
              <Search />
            </IconButton>
            {productsSearch.length ? (
              <div className="absolute right-0 top-8 bg-white dark:bg-primary-500 w-full h-[400px] scroll-hidden overflow-y-auto z-[210] rounded-b-[9px] overflow-hidden hide-scrollbar">
                {productsSearch.slice(0, 10).map((product) => (
                  <div className="flex p-2 hover:dark:bg-indigo-500/40 hover:bg-slate-300">
                    <Link
                      className="relative h-24 w-[30%] p-1"
                      href={`/product/${product.id}`}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        priority={true}
                      />
                    </Link>
                    <Link
                      href={`/product/${product.id}`}
                      className="w-[70%] p-6 font-semibold hover:text-primary-500 dark:hover:text-secondary-500 transition-all hover:scale-105"
                    >
                      {product.name}
                    </Link>
                  </div>
                ))}
                <Link
                  href={`/product/search/${search}`}
                  className="block font-semibold text-center py-4 dark:bg-indigo-500/40 bg-slate-300"
                >
                  See al products
                </Link>
              </div>
            ) : null}
          </FlexBetween>
          <FlexBetween>
            <Link href="/" className="font-extrabold text-2xl mr-4">
              DIGITAL DREAMS
            </Link>
            <Image
              src={Logo}
              alt=""
              width={55}
              height={55}
              className="rounded-full"
            ></Image>
          </FlexBetween>
          <div className="flex bg-">
            <NavButton
              title=""
              customFunc={() => {
                dispatch(setMode());
                setTheme(theme === "light" ? "dark" : "light");
              }}
              color={themeM.palette.secondary[200]}
              icon={
                themeM.palette.mode === "dark" ? <BsMoon /> : <WiSolarEclipse />
              }
              dotColor={undefined}
              selected={undefined}
            />
            <NavButton
              title="Cart"
              customFunc={() => handleModal("cart")}
              color={themeM.palette.secondary[200]}
              icon={<FiShoppingCart />}
              dotColor={undefined}
              selected={isClicked.cart}
            />
            <NavButton
              title="Chat"
              dotColor="#03C9D7"
              customFunc={() => handleModal("chat")}
              color={themeM.palette.secondary[200]}
              icon={<BsChatLeft />}
              selected={isClicked.chat}
            />
            <NavButton
              title="Notification"
              dotColor="rgb(254, 201, 15)"
              customFunc={() => handleModal("notification")}
              color={themeM.palette.secondary[200]}
              icon={<RiNotification3Line />}
              selected={isClicked.notification}
            />
            {!user && (
              <NavButton
                title="person"
                customFunc={() => handleModal("userProfile")}
                color={themeM.palette.secondary[200]}
                icon={<BsFilePersonFill />}
                dotColor={undefined}
                selected={isClicked.userProfile}
              />
            )}
            <div
              className="flex items-center gap-2 cursor-pointer p-1 rounded-lg"
              onClick={() => handleModal("userProfile")}
            >
              {user && (
                <>
                  {user?.image && !errorImage ? (
                    <Image
                      className="rounded-full w-8 h-8"
                      src={user?.image}
                      alt="user"
                      width={32}
                      height={32}
                      onError={() => setErrorImage(true)}
                    />
                  ) : (
                    <Avatar name={user && user.name} size="40" round={true} />
                  )}
                  <p>
                    <span
                      className={`text-[${themeM.palette.secondary[100]}] text-14`}
                    >
                      Hi,
                    </span>{" "}
                    <span
                      className={`text-[${themeM.palette.secondary[100]}] font-bold ml-1 text-14`}
                    >
                      {user?.name}
                    </span>
                  </p>
                  <MdKeyboardArrowDown className="text-gray-400 text-14" />
                </>
              )}
            </div>
            {isClicked.cart && <Cart />}
            {isClicked.chat && <Chat />}
            {isClicked.notification && <Notification />}
            {isClicked.userProfile && <UserProfile user={user} />}
          </div>
        </Toolbar>
      ) : (
        <div className="flex justify-between p-3">
          <FlexBetween>
            <Image
              src={Logo}
              alt=""
              width={40}
              height={55}
              className="rounded-full"
            ></Image>
            <Link href="/" className="font-extrabold text-sm ml-1">
              DIGITAL DREAMS
            </Link>
          </FlexBetween>
          <button
            className="rounded-full bg-primary-500 dark:bg-secondary-200 p-2"
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <AiOutlineBars className="h-6 w-6 dark:text-black text-white" />
          </button>
        </div>
      )}

      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed flex flex-col items-center right-0 bottom-0 z-40 h-full w-[300px] bg-slate-200 dark:bg-primary-500 shadow-slate-300 shadow-sm dark:shadow-primary-800 transition-all duration-1000 ease-in-out">
          {/* CLOSE ICON */}
          <div className="flex w-full justify-between p-12">
            <NavButton
              title=""
              customFunc={() => {
                dispatch(setMode());
                setTheme(theme === "light" ? "dark" : "light");
              }}
              color={themeM.palette.secondary[200]}
              icon={
                themeM.palette.mode === "dark" ? <BsMoon /> : <WiSolarEclipse />
              }
              dotColor={undefined}
              selected={undefined}
            />
            <button
              onClick={() => {
                setIsMenuToggled(!isMenuToggled);
              }}
            >
              <AiOutlineClose
                color={themeM.palette.secondary[200]}
                className="h-6 w-6 text-primary-700 dark:text-slate-100"
              />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="flex w-3/4 flex-col gap-10 text-2xl">
            <FlexBetween
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem"
              className="relative bg-white"
            >
              <InputBase
                placeholder="Search..."
                onChange={(e) => {
                  handleSearch(e);
                }}
              />
              <IconButton onClick={(e) => alert(search)}>
                <Search />
              </IconButton>
              {productsSearch.length ? (
                <div className="absolute right-0 top-8 bg-white dark:bg-primary-600 w-full h-[400px] scroll-hidden overflow-y-auto z-[210] rounded-b-[9px] overflow-hidden hide-scrollbar">
                  {productsSearch.slice(0, 10).map((product) => (
                    <div className="flex p-2 hover:dark:bg-indigo-500/40 hover:bg-slate-300 font-semibold text-sm items-center">
                      <Link
                        className="relative h-24 w-[30%] p-1"
                        href={`/product/${product.id}`}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          priority={true}
                        />
                      </Link>
                      <Link
                        href={`/product/${product.id}`}
                        className="w-[70%] p-2 hover:text-primary-500 dark:hover:text-secondary-500 transition-all hover:scale-105"
                      >
                        {product.name}
                      </Link>
                    </div>
                  ))}
                  <Link
                    href={`/product/search/${search}`}
                    className="block font-semibold text-center py-4 text-base dark:bg-indigo-500/40 bg-slate-300"
                  >
                    See al products
                  </Link>
                </div>
              ) : null}
            </FlexBetween>
            <div
              className={`${
                isClicked.cart ? selectModalColor : null
              } flex items-center cursor-pointer hover:scale-110 hover:bg-slate-300 hover:dark:bg-primary-600 rounded-lg`}
              onClick={() => {
                handleModal("cart");
                setIsMenuToggled(!isMenuToggled);
              }}
            >
              <NavButton
                title="Cart"
                color={themeM.palette.secondary[200]}
                icon={<FiShoppingCart />}
                dotColor={undefined}
                customFunc={() => null}
                selected={undefined}
              />
              <span style={{ color: themeM.palette.secondary[200] }}>Cart</span>
            </div>
            <div
              className={`${
                isClicked.chat ? selectModalColor : null
              } flex items-center cursor-pointer hover:scale-110 hover:bg-slate-300 hover:dark:bg-primary-600 rounded-lg`}
              onClick={() => {
                handleModal("chat");
                setIsMenuToggled(!isMenuToggled);
              }}
            >
              <NavButton
                title="Chat"
                dotColor="#03C9D7"
                color={themeM.palette.secondary[200]}
                icon={<BsChatLeft />}
                customFunc={() => null}
                selected={undefined}
              />
              <span style={{ color: themeM.palette.secondary[200] }}>Chat</span>
            </div>
            <div
              className={`${
                isClicked.notification ? selectModalColor : null
              } flex items-center cursor-pointer hover:scale-110 hover:bg-slate-300 hover:dark:bg-primary-600 rounded-lg`}
              onClick={() => {
                handleModal("notification");
                setIsMenuToggled(!isMenuToggled);
              }}
            >
              <NavButton
                title="Notification"
                dotColor="rgb(254, 201, 15)"
                color={themeM.palette.secondary[200]}
                icon={<RiNotification3Line />}
                customFunc={() => null}
                selected={undefined}
              />
              <span style={{ color: themeM.palette.secondary[200] }}>
                Notification
              </span>
            </div>
            <div
              className={`${
                isClicked.userProfile ? selectModalColor : null
              } flex items-center cursor-pointer hover:scale-110 hover:bg-slate-300 hover:dark:bg-primary-600 rounded-lg`}
              onClick={() => {
                handleModal("userProfile");
                setIsMenuToggled(!isMenuToggled);
              }}
            >
              <NavButton
                title="Person"
                color={themeM.palette.secondary[200]}
                icon={<BsFilePersonFill />}
                dotColor={undefined}
                customFunc={() => null}
                selected={undefined}
              />
              <span style={{ color: themeM.palette.secondary[200] }}>
                Settings
              </span>
            </div>
          </div>
        </div>
      )}
      {!isAboveMediumScreens && isClicked.cart && <CartMobile />}
      {!isAboveMediumScreens && isClicked.chat && <ChatMobile />}
      {!isAboveMediumScreens && isClicked.notification && (
        <NotificationMobile />
      )}
      {!isAboveMediumScreens && isClicked.userProfile && (
        <UserProfileMobile user={user} />
      )}
    </AppBar>
  );
};

export default Navbar;
