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
import { persistor, store } from '@/state/store';
import { PersistGate } from 'redux-persist/integration/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/free-mode";
import Head from 'next/head';


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider attribute='class'>
            <Wrapper>
              <Head>
                <meta name="description" content="Encuentra los mejores productos tecnológicos en nuestro e-commerce: computadoras, ratones, teclados, y luces LED. Ofrecemos una amplia variedad de marcas y modelos, con características que se adaptan a las necesidades de cada usuario. Además, contamos con precios competitivos y un servicio de atención al cliente excepcional. ¡Visítanos y encuentra todo lo que necesitas para estar a la vanguardia de la tecnología!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preload" href="https://fonts.googleapis.com/css?family=Montserrat:400,800&display=swap" as="font" />
                <link rel="icon" href="/github.png" />
              </Head>
              <Component {...pageProps} />
            </Wrapper>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
