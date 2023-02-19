import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import Login from '@/components/Login'
type Props = {}
export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>Personal App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={""}>
        <h1>Hello world!</h1>
        <Link href="dashboard">Dashboard</Link>
        <Link href="/api/auth/signin">Login</Link>
        
        <Login/>
      </main>
    </>
  )
}
