import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from '@/theme';
interface Props {
    children?: React.ReactNode;
}
type StateGlobal = {
    mode: PaletteMode
}
type State = {
    global: StateGlobal
}
export const Wrapper : React.FC<Props> = ({ children }) => {
    const mode = useSelector((state: State) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};