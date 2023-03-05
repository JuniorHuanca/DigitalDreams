import '@/styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { InferGetServerSidePropsType } from 'next'
import { CssBaseline, PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from '@/theme';
import { Wrapper } from '@/shared/components/Wrapper/Wrapper'
import { useRouter } from 'next/router';
import Dashboard from './dashboard'
import LayoutDashboard from '@/components/Layouts/LayoutDashboard'
import Products from './dashboard/products'
import type { Session } from 'next-auth'
import Customers from './dashboard/customers'
import Transactions from './dashboard/transactions'
import Geography from './dashboard/geography'
import Overview from './dashboard/overview'
import Daily from './dashboard/daily'
import Monthly from './dashboard/monthly'
import Breakdown from './dashboard/breakdown'
import Admin from './dashboard/admin'
import Performance from './dashboard/performance'
import Layout from '@/components/Layouts/Layout';
import Calendar from './dashboard/calendar';
import { ThemeProvider } from 'next-themes'
import store from '@/state/store';




export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider attribute='class'>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
