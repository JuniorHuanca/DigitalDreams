import '@/styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import { configureStore } from '@reduxjs/toolkit'
import globalReducer from '@/state'
import { Provider } from 'react-redux'
import { setupListeners } from "@reduxjs/toolkit/query";
import { InferGetServerSidePropsType } from 'next'
import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from '@/theme';
import { Wrapper } from '@/shared/components/Wrapper/Wrapper'
import { useRouter } from 'next/router';
import Dashboard from './dashboard'
import LayoutDashboard from '@/components/Layouts/LayoutDashboard'
import Products from './dashboard/products'
import { api } from '@/state/api'
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


const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Wrapper>
          {pathname.startsWith('/dashboard') ? (
            <>
              <LayoutDashboard >
                {/* {pathname === '/dashboard' && <Dashboard />}
                {pathname === '/dashboard/products' && <Products />}
                {pathname === '/dashboard/customers' && <Customers />}
                {pathname === '/dashboard/transactions' && <Transactions />}
                {pathname === '/dashboard/geography' && <Geography />}
                {pathname === '/dashboard/overview' && <Overview />}
                {pathname === '/dashboard/daily' && <Daily />}
                {pathname === '/dashboard/monthly' && <Monthly />}
                {pathname === '/dashboard/breakdown' && <Breakdown />}
                {pathname === '/dashboard/admin' && <Admin />}
                {pathname === '/dashboard/performance' && <Performance />} */}
                {pathname === '/dashboard/customers' && <Customers />}
                {pathname === '/dashboard/admin' && <Admin />}
                {pathname === '/dashboard/calendar' && <Calendar />}

              </LayoutDashboard>
            </>
          ) : pathname.startsWith('/auth') ? <Component {...pageProps} /> : (
            <>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </>
          )}
        </Wrapper>
      </Provider>
    </SessionProvider>
  );
}
