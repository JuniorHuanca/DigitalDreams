import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { themeSettings } from "@/theme";
import { useTheme as tailWindTheme } from "next-themes";
import LoaderModal from "@/components/Loaders/LoaderModal";
import { selectLoader, setMode } from "@/state/globalSlice";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RootState } from "@/state/store";
import { store } from "@/state/store";
import { Toaster } from "react-hot-toast";
import { setCartArray, setItemsCart } from "@/state/cart/cartSlice";
interface Props {
  children?: React.ReactNode;
}

export const Wrapper: React.FC<Props> = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const modeInitial = prefersDarkMode ? "dark" : "light";
  const loader = useSelector(selectLoader);
  const { setTheme } = tailWindTheme();
  const mode = useSelector((state: RootState) => state.global.mode);
  const themeMode = mode
    ? mode === "system"
      ? modeInitial
      : mode
    : modeInitial;
  const themeM = useMemo(
    () => createTheme(themeSettings(themeMode as PaletteMode)),
    [mode, themeMode]
  );
  useEffect(() => {
    setTheme(mode);
  }, [mode, setTheme, themeMode, prefersDarkMode, modeInitial, themeM]);
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "theme") {
      const newThemeMode = event.newValue;
      if (newThemeMode !== store.getState().global.mode) {
        store.dispatch(setMode());
      }
    }
    if (event.key === "persist:root") {
      const state = JSON.parse(event.newValue as string);
      const stateCart = JSON.parse(state.cart);
      const { cart, itemsCart } = stateCart;
      const cartCurrent = store.getState().cart.cart.concat(cart);
      const mergedArray = cartCurrent.filter(
        (obj, index, self) =>
          index ===
          self.findIndex(
            (t) => t.id === obj.id && t.product.name === obj.product.name
          )
      );
      if (cart.length !== store.getState().cart.cart.length) {
        store.dispatch(setCartArray(mergedArray));
      }
      if (store.getState().cart.itemsCart !== itemsCart) {
        store.dispatch(setItemsCart(itemsCart));
      }
    }
  };
  return (
    <ThemeProvider theme={themeM}>
      <CssBaseline />
      {children}
      {loader && <LoaderModal />}
      <Toaster position="top-left" reverseOrder={true} />
    </ThemeProvider>
  );
};
