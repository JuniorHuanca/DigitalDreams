import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { themeSettings } from '@/theme';
import { useTheme as tailWindTheme } from 'next-themes'
import LoaderModal from '@/components/Loaders/LoaderModal';
import { selectLoader, setModeInitial } from '@/state/globalSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RootState, useAppDispatch } from '@/state/store';
interface Props {
    children?: React.ReactNode;
}

export const Wrapper: React.FC<Props> = ({ children }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const modeInitial = prefersDarkMode ? 'dark' : 'light'
    const loader = useSelector(selectLoader)
    const { theme, setTheme } = tailWindTheme()
    const mode = useSelector((state: RootState) => state.global.mode);
    const themeMode = mode ? (mode === 'system' ? modeInitial : mode) : modeInitial;
    const dispatch = useAppDispatch()
    const themeM = useMemo(() => createTheme(themeSettings(themeMode as PaletteMode)), [themeMode]);
    useEffect(() => {
        setTheme(mode)
    }, [mode, theme, setTheme, themeMode, dispatch, prefersDarkMode, modeInitial])

    return (
        <ThemeProvider theme={themeM}>
            <CssBaseline />
            {children}
            {loader && <LoaderModal />}
        </ThemeProvider>
    );
};