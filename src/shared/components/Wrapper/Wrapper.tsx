import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { themeSettings } from '@/theme';
import { useTheme as tailWindTheme } from 'next-themes'
import LoaderModal from '@/components/Loaders/LoaderModal';
import { selectLoader } from '@/state/globalSlice';

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
    const loader = useSelector(selectLoader)
    const { theme, setTheme } = tailWindTheme()
    const mode = useSelector((state: State) => state.global.mode);
    const themeM = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    useEffect(() => {
        setTheme(mode)
    }, [mode, theme, setTheme])

    return (
        <ThemeProvider theme={themeM}>
            <CssBaseline />
            {children}
            {loader && <LoaderModal />}
        </ThemeProvider>
    );
};