import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { themeSettings } from '@/theme';
import { useTheme as tailWindTheme } from 'next-themes'

interface Props {
    children?: React.ReactNode;
}
type StateGlobal = {
    mode: PaletteMode
}
type State = {
    global: StateGlobal
}
export const Wrapper: React.FC<Props> = ({ children }) => {
    const { theme, setTheme } = tailWindTheme()
    const mode = useSelector((state: State) => state.global.mode);
    const themeM = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    useEffect(() => {
        setTheme(mode)
    }, [theme])

    return (
        <ThemeProvider theme={themeM}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};