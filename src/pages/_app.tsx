import '@/styles/globals.css'
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
import Layout from '@/components/Layout/Layout'
import Products from './dashboard/products'

const store = configureStore({
  reducer: {
    global: globalReducer,
    // [api.reducerPath]: api.reducer,
  },
  // middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Provider store={store}>
      <Wrapper>
        {pathname.startsWith('/dashboard') ? (
          <>
            <Layout />
            {pathname === '/dashboard'}
            {pathname === '/dashboard/products'}
            {/* {pathname === '/dashboard/customers' && <Customers />} */}
            <Component {...pageProps} />
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </Wrapper>
    </Provider>
  );
}
