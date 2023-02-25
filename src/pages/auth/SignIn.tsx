import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import styles from "./SignIn.module.css"

import { useFormik } from 'formik'
import { validateLogIn } from "@/shared/util/validate"
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import Logo from '@/assets/img/Avatar.png'
// import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
// import useInfoProviders from '../hook/providers'


type Props = {
    providers: any
}
function SignIn({ providers }: Props) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) return null
    const stylesCenter = "flex flex-col justify-center items-center"
    return (
        <>
            <Head>
                <title>APP | Log in</title>
            </Head>
            <div className={`${stylesCenter} min-h-[90vh] min-w-screen`}>
                <div className={`${stylesCenter} p-2 w-[50%] bg-indigo-600`}>
                    <form className={`${stylesCenter} gap-4`}>
                        <p className="text-xl">Login</p>
                        <Image src={Logo} alt="Logo" className="w-[12%] h-[12%] rounded-full" />
                        <input className="bg-slate-600 focus:outline-none text-gray-600 p-4 rounded-full dark:text-gray-400" placeholder="Username" type="text" />
                        <input className="bg-slate-600 focus:outline-none text-gray-600 p-4 rounded-full dark:text-gray-400" placeholder="Password" type="text" />
                        <button className="bg-emerald-500 py-4 px-8 rounded-3xl">Submit</button>
                    </form>
                    <h3>or</h3>
                    <div className={`${stylesCenter} gap-4`}>
                        {Object.values(providers).map((provider: any) => (
                            <div key={provider.name} className={styles.container}>
                                <button className="bg-rose-900 p-4 rounded-3xl" onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/dashboard" })}>
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

export default SignIn