import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Clear,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import FlexBetween from "../../FlexBetween";
import {
  handleClickModal,
  selectIsClicked,
  setCurrentPage,
  setMode,
} from "@/state/globalSlice";
import profileImage from "@/assets/profile.jpeg";
import { useTheme as tailWindTheme } from "next-themes";
import { useSelector } from "react-redux";
import Logo from "@/assets/img/Avatar.png";
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
import { useAppDispatch } from "@/state/store";
import { useRouter } from "next/router";
import { allItemsCart, allProductsCart } from "@/state/cart/cartSlice";
import {
  allProducts,
  allProductsBySearch,
  getAllProducts,
  setProductsBysearch,
} from "@/state/products/products/productsSlice";
import useMediaQuery from "@/shared/util/useMediaQuery";
import Link from "next/link";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import CartMobile from "@/components/Modals/CartMobile";
import ChatMobile from "@/components/Modals/ChatMobile";
import NotificationMobile from "@/components/Modals/NotificationMobile";
import UserProfileMobile from "@/components/Modals/UserProfileMobile";
import NavButton from "@/components/Navbar/NavButton";
import { BsMoon, BsFilePersonFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { WiSolarEclipse } from "react-icons/wi";
import Avatar from "react-avatar";
import { MdKeyboardArrowDown } from "react-icons/md";
import Cart from "@/components/Modals/Cart";
import Chat from "@/components/Modals/Chat";
import Notification from "@/components/Modals/Notification";
import UserProfile from "@/components/Modals/UserProfile";
type Props = {
  user: any;
  // {
  //     name:string,
  //     occupation: string,
  // },
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const cart = useSelector(allProductsCart);
  const router = useRouter();
  const isClicked = useSelector(selectIsClicked);
  const [visible, setVisible] = useState<boolean>(false);
  const products = useSelector(allProducts);
  const productsSearch = useSelector(allProductsBySearch);
  const productsSearchNav = productsSearch.slice(0, 10);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const dispatch = useAppDispatch();
  const themeM: ITheme = useTheme();
  const { theme, setTheme } = tailWindTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [errorImage, setErrorImage] = useState(false);
  const totalItems = useSelector(allItemsCart);
  const handleModal = async (value: string) => {
    dispatch(handleClickModal(value));
  };
  useEffect(() => {
    setMounted(true);
    dispatch(getAllProducts());
    return () => {
      setSearch("");
    };
  }, [isClicked]);

  useEffect(() => {
    if (mounted) {
      if (search.length > 2) {
        if (!router.asPath.includes("?products")) {
          setVisible(true);
        }
        dispatch(setProductsBysearch({ products, search }));
        dispatch(setCurrentPage(1));
      } else {
        setVisible(false);
      }
    }
  }, [search, mounted, visible]);

  if (!mounted) {
    return null;
  }
  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };
  const selectModalColor = "bg-slate-300 dark:bg-primary-600 px-2";

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      {isAboveMediumScreens ? (
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LEFT SIDE */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <FlexBetween
              backgroundColor={themeM.palette.background.alt}
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem"
              className="relative"
            >
              <InputBase
                placeholder="Search..."
                value={search}
                onChange={handleChange}
              />
              <IconButton
                onClick={() => {
                  setSearch("");
                  setVisible(false);
                }}
              >
                {visible ? <Clear /> : <Search />}
              </IconButton>
              {productsSearchNav.length && visible ? (
                <div className="absolute right-0 top-8 bg-white dark:bg-primary-500 w-full max-h-[420px] z-[210] rounded-b-[9px] overflow-hidden">
                  <div className="w-full max-h-[370px] overflow-y-auto z-[210] overflow-hidden hide-scrollbar">
                    {productsSearchNav.map((product, index) => (
                      <div
                        key={index}
                        className="flex p-2 hover:dark:bg-indigo-500/40 hover:bg-slate-300"
                      >
                        <Link
                          className="relative h-24 w-[30%] p-1"
                          href={`/product/${product.id}`}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 700px"
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
                  </div>
                  <Link
                    href={`/products/search?products=${search}`}
                    className="block font-semibold text-center py-4 dark:bg-indigo-500/40 bg-slate-300"
                  >
                    See al products
                  </Link>
                </div>
              ) : null}
            </FlexBetween>
          </FlexBetween>

          {/* RIGHT SIDE */}
          <div className="flex ml-20">
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
            <div className="relative">
              <NavButton
                title="Cart"
                customFunc={() => handleModal("cart")}
                color={themeM.palette.secondary[200]}
                icon={<FiShoppingCart />}
                // dotColor="#03C9D7"
                dotColor={undefined}
                selected={isClicked.cart}
              />

              {cart.length > 0 && (
                <span className="text-[0.65rem] absolute top-0 left-2 text-primary-700">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 justify-center"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 justify-center">
                      {totalItems > 99 ? "+99" : totalItems}
                    </span>
                  </span>
                </span>
              )}
            </div>

            {/* <NavButton
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
            /> */}
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
                      priority
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
        <div className="nav">
          <input type="checkbox" id="nav-check" />
          <div className="nav-header">
            <div className="nav-title">
              <div className="flex items-center">
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <MenuIcon />
                </IconButton>
                <FlexBetween
                  backgroundColor={themeM.palette.background.alt}
                  borderRadius="9px"
                  p="0.1rem 1.5rem"
                  className="w-[70%] relative"
                >
                  <InputBase
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      setSearch("");
                      setVisible(false);
                    }}
                  >
                    {visible ? <Clear /> : <Search />}
                  </IconButton>
                  {productsSearchNav.length && visible ? (
                    <div className="absolute right-0 top-8 bg-white text-black dark:text-white dark:bg-primary-600 w-full max-h-[420px] h-[420px] overflow-y-auto z-[210] rounded-b-[9px] overflow-hidden hide-scrollbar">
                      <div className="w-full h-[87%] overflow-y-auto z-[210] overflow-hidden hide-scrollbar">
                        {productsSearchNav.map((product, index) => (
                          <div
                            key={index}
                            className="flex p-2 hover:dark:bg-indigo-500/40 hover:bg-slate-300 font-semibold text-sm items-center"
                          >
                            <Link
                              className="relative h-24 w-[30%] p-1"
                              href={`/product/${product.id}`}
                            >
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 700px"
                                priority
                              />
                            </Link>
                            <Link
                              href={`/product/${product.id}`}
                              className="w-[70%] p-4 font-semibold hover:text-primary-500 dark:hover:text-secondary-500 transition-all hover:scale-105"
                            >
                              {product.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/products/search?products=${search}`}
                        className="block h-[13%] font-semibold text-center py-4 text-base dark:bg-indigo-500/40 bg-slate-300"
                      >
                        See al products
                      </Link>
                    </div>
                  ) : null}
                </FlexBetween>
              </div>
            </div>
          </div>
          <div className="nav-btn">
            <label htmlFor="nav-check">
              <span className="border-t-2 dark:border-white border-primary-600"></span>
              <span className="border-t-2 dark:border-white border-primary-600"></span>
              <span className="border-t-2 dark:border-white border-primary-600"></span>
            </label>
          </div>

          <div className="nav-links bg-white dark:bg-primary-700">
            <div className="flex w-full justify-center items-center">
              <Image
                src={Logo}
                alt=""
                width={40}
                height={55}
                priority
                className="rounded-full"
              ></Image>
              <Link href="/" className="font-extrabold text-sm ml-1">
                DIGITAL DREAMS
              </Link>
            </div>
            <div
              className={`flex items-center cursor-pointer hover:bg-slate-300 hover:dark:bg-primary-600 rounded-lg`}
              onClick={() => {
                dispatch(setMode());
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              <NavButton
                title=""
                color={themeM.palette.secondary[200]}
                icon={
                  themeM.palette.mode === "dark" ? (
                    <BsMoon />
                  ) : (
                    <WiSolarEclipse />
                  )
                }
                dotColor={undefined}
                // customFunc={() => {
                //   dispatch(setMode());
                //   setTheme(theme === "light" ? "dark" : "light");
                // }}
                customFunc={() => null}
                selected={undefined}
              />
              <span style={{ color: themeM.palette.secondary[200] }}>
                {themeM.palette.mode === "dark" ? "Dark" : "Light"}
              </span>
            </div>
            <div
              className={`${
                isClicked.cart ? selectModalColor : null
              } flex items-center cursor-pointer hover:bg-slate-300 hover:dark:bg-primary-600 rounded-lg`}
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
                isClicked.userProfile ? selectModalColor : null
              } flex items-center cursor-pointer hover:bg-slate-300 hover:dark:bg-primary-600 rounded-lg`}
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
              className="relative bg-white dark:bg-primary-600"
            >
              <InputBase
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <IconButton
                onClick={() => {
                  setSearch("");
                  setVisible(false);
                }}
              >
                {visible ? <Clear /> : <Search />}
              </IconButton>
              {productsSearchNav.length && visible ? (
                <div className="absolute right-0 top-8 bg-white dark:bg-primary-600 w-full max-h-[420px] h-[420px] overflow-y-auto z-[210] rounded-b-[9px] overflow-hidden hide-scrollbar">
                  <div className="w-full h-[87%] overflow-y-auto z-[210] overflow-hidden hide-scrollbar">
                    {productsSearchNav.map((product, index) => (
                      <div
                        key={index}
                        className="flex p-2 hover:dark:bg-indigo-500/40 hover:bg-slate-300 font-semibold text-sm items-center"
                      >
                        <Link
                          className="relative h-24 w-[30%] p-1"
                          href={`/product/${product.id}`}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 700px"
                            priority
                          />
                        </Link>
                        <Link
                          href={`/product/${product.id}`}
                          className="w-[70%] p-4 font-semibold hover:text-primary-500 dark:hover:text-secondary-500 transition-all hover:scale-105"
                        >
                          {product.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/products/search?products=${search}`}
                    className="block h-[13%] font-semibold text-center py-4 text-base dark:bg-indigo-500/40 bg-slate-300"
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
            {/* <div
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
            </div> */}
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
