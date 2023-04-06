import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { themeSettings } from '@/theme';
import { useTheme as tailWindTheme } from 'next-themes'
import LoaderModal from '@/components/Loaders/LoaderModal';
import { selectLoader, setMode } from '@/state/globalSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RootState } from '@/state/store';
import { store } from '@/state/store';
interface Props {
    children?: React.ReactNode;
}

export const Wrapper: React.FC<Props> = ({ children }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const modeInitial = prefersDarkMode ? 'dark' : 'light'
    const loader = useSelector(selectLoader)
    const { setTheme } = tailWindTheme()
    const mode = useSelector((state: RootState) => state.global.mode);
    const themeMode = mode ? (mode === 'system' ? modeInitial : mode) : modeInitial;
    const themeM = useMemo(() => createTheme(themeSettings(themeMode as PaletteMode)), [mode, themeMode]);
    useEffect(() => {
        setTheme(mode)
    }, [mode, setTheme, themeMode, prefersDarkMode, modeInitial, themeM])
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
    };
    return (
        <ThemeProvider theme={themeM}>
            <CssBaseline />
            {children}
            {loader && <LoaderModal />}
        </ThemeProvider>
    );
};