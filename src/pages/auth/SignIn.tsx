// import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
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
import { HiAtSymbol, HiFingerPrint, HiUser } from 'react-icons/hi'
import Logo from '@/assets/img/Avatar.png'
import useInfoProviders from "@/shared/util/providers"
import SvgGoogle from "@/components/Icons/Google"
import Github from "@/components/Icons/Github"
import useMediaQuery from "@/shared/util/useMediaQuery"

type Props = {}
function SignIn(props: Props) {
    const [mounted, setMounted] = useState<boolean>(false)
    const [signInForm, setSignInForm] = useState<boolean>(true)
    const [signUpForm, setSignUpForm] = useState<boolean>(false)
    const [containerClass, setContainerClass] = useState('');
    const isAboveSmallScreens = useMediaQuery("(min-width: 620px)");
    const { providers } = useInfoProviders()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const container = document.getElementById('container');
        containerClass ? container?.classList.add(containerClass) : container?.classList.remove('rightPanelActive')
    }, [containerClass]);
    const handleSignUp = () => {
        setContainerClass(styles.rightPanelActive);
    };
    const handleSignIn = () => {
        setContainerClass('');
    };
    if (!mounted) return null
    const stylesCenter = "flex flex-col justify-center items-center"
    // console.log(providers)
    return (
        <>
            <Head>
                <title>APP | Log in</title>
            </Head>
            {isAboveSmallScreens &&
                <div className={`${stylesCenter} min-h-[100vh] min-w-screen`}>

                    <div className={`flex w-[95%] h-[80vh] rounded-xl overflow-hidden ${styles.container} ${containerClass}`} id="container">
                        <div className={`flex flex-col gap-4 p-4 w-4/6 h-full bg-white absolute transition-all duration-700 ease-in-out ${styles.signUpContainer}`}>
                            <div className="flex w-full h-[12%] items-center">
                                <div className="w-12 h-12">
                                    <Image src={Logo} alt="Logo" className="rounded-full p-2" />
                                </div>
                                <p className="px-4  text-black">DigitalDreams</p>
                            </div>
                            <form className={`${stylesCenter} gap-4 py-6`}>
                                <h2 className="font-bold text-2xl md:text-3xl text-sky-900">Sing up to DigitalDreams</h2>
                                <div className="flex flex-row justify-evenly items-center gap-4">
                                    {providers?.google && (
                                        <button
                                            className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                await signIn(providers.google.id)
                                            }}
                                        >
                                            <SvgGoogle />
                                        </button>
                                    )}
                                    {providers?.github && (
                                        <button
                                            className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                await signIn(providers.github.id)
                                            }}
                                        >
                                            <Github />
                                        </button>
                                    )}
                                </div>
                                <p className="text-black">or use your email account</p>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center pl-2 bg-gray-400/30">
                                        <HiUser size={28} className="fill-gray-800/30" />
                                    </span>
                                    <input className="w-3/4 md:w-2/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-sm" placeholder="Username" type="text" />
                                </div>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center pl-2 bg-gray-400/30">
                                        <HiAtSymbol size={28} className="fill-gray-800/30" />
                                    </span>
                                    <input className="w-3/4 md:w-2/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-sm" placeholder="Email" type="text" />
                                </div>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center pl-2 bg-gray-400/30">
                                        <HiFingerPrint size={28} /*className={`${hola ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}*/ className="fill-gray-800/30" />
                                    </span>
                                    <input className="w-3/4 md:w-2/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-sm" placeholder="Password" type="text" />
                                </div>
                                <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform">Sign Up</button>

                            </form>
                        </div>
                        <div className={`flex flex-col gap-4 p-4 w-4/6 h-full bg-white absolute transition-all duration-700 ease-in-out ${styles.signInContainer}`}>
                            <div className="flex w-full h-[12%] items-center">
                                <div className="w-12 h-12">
                                    <Image src={Logo} alt="Logo" className="rounded-full p-2" />
                                </div>
                                <p className="px-4  text-black">DigitalDreams</p>
                            </div>
                            <form className={`${stylesCenter} gap-4 py-6`}>
                                <h2 className="font-bold text-2xl md:text-3xl text-sky-900">Sing in to DigitalDreams</h2>
                                <div className="flex flex-row justify-evenly items-center gap-4">
                                    {providers?.google && (
                                        <button
                                            className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                await signIn(providers.google.id)
                                            }}
                                        >
                                            <SvgGoogle />
                                        </button>
                                    )}
                                    {providers?.github && (
                                        <button
                                            className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                await signIn(providers.github.id)
                                            }}
                                        >
                                            <Github />
                                        </button>
                                    )}
                                </div>
                                <p className="text-black">or use your email account</p>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center pl-2 bg-gray-400/30">
                                        <HiAtSymbol size={28} className="fill-gray-800/30" />
                                    </span>
                                    <input className="w-3/4 md:w-2/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-sm" placeholder="Email / Username" type="text" />
                                </div>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center pl-2 bg-gray-400/30">
                                        <HiFingerPrint size={28} /*className={`${hola ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}*/ className="fill-gray-800/30" />
                                    </span>
                                    <input className="w-3/4 md:w-2/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-sm" placeholder="Password" type="text" />
                                </div>
                                <div className="border-b-2 border-black text-black">
                                    <Link href="/forget" >Forgot your password?</Link>
                                </div>
                                <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform">Sign In</button>

                            </form>
                        </div>

                        <div className={`w-2/6 h-full left-[66.666667%] ${styles.overlayContainer}`}>
                            <div className={`${styles.overlay}`}>
                                <div className={`${styles.overlayPanel} ${styles.overlayLeft} gap-4`}>
                                    <h2 className="font-bold text-2xl sm:text-3xl">Welcome Back!</h2>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button className="py-4 px-7 md:px-10 rounded-3xl border border-white hover:scale-125 transition-transform" id="signIn" onClick={handleSignIn}>Sign In</button>
                                    <div className="absolute top-2 left-2 text-5xl hover:scale-125 transition-transform">
                                        <Link href={'/'} >X</Link>
                                    </div>
                                </div>
                                <div className={`${styles.overlayPanel} ${styles.overlayRight} gap-4`}>
                                    <h2 className="font-bold text-2xl sm:text-3xl">Hello, Friend!</h2>
                                    <p>Enter your personal details and start journey with us</p>
                                    <button className="py-4 px-7 md:px-10 rounded-3xl border border-white hover:scale-125 transition-transform" id="signUp" onClick={handleSignUp}>Sign Up</button>
                                    <div className="absolute top-2 right-2 text-5xl hover:scale-125 transition-transform">
                                        <Link href={'/'} >X</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {!isAboveSmallScreens &&
                <div className="flex justify-center items-center h-screen p-4">
                    <div className="relative flex flex-col gap-4 bg-white w-full xs:w-[80%] min-h-[80%] p-4 rounded-xl">
                        <div className="flex items-center">
                            <div className="w-12 h-12">
                                <Image src={Logo} alt="Logo" className="rounded-full p-2" />
                            </div>
                            <p className="px-4  text-black">DigitalDreams</p>
                        </div>
                        <div className="flex justify-evenly">
                            <button className={`${signInForm ? 'border-b-2 border-sky-900 text-black' : 'text-slate-500'} font-semibold mt-6 text-lg`} onClick={() => {
                                setSignInForm(true)
                                setSignUpForm(false)
                            }}>SIGN IN</button>
                            <button className={`${signUpForm ? 'border-b-2 border-sky-900 text-black' : 'text-slate-500'} font-semibold mt-6 text-lg`} onClick={() => {
                                setSignUpForm(true)
                                setSignInForm(false)
                            }}>SIGN UP</button>
                        </div>
                        {signInForm &&
                            <div className="flex flex-col items-center gap-6">
                                <h2 className="text-sm font-bold text-sky-900">Sing in to DigitalDreams</h2>
                                <div className="flex flex-row justify-evenly items-center gap-4">
                                    {providers?.google && (
                                        <button
                                            className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                await signIn(providers.google.id)
                                            }}
                                        >
                                            <SvgGoogle />
                                        </button>
                                    )}
                                    {providers?.github && (
                                        <button
                                            className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                await signIn(providers.github.id)
                                            }}
                                        >
                                            <Github />
                                        </button>
                                    )}
                                </div>
                                <p className="text-black">or use your email account</p>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center pl-2 bg-gray-400/30">
                                        <HiAtSymbol size={28} className="fill-gray-800/30" />
                                    </span>
                                    <input className="w-3/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-sm" placeholder="Email / Username" type="text" />
                                </div>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center pl-2 bg-gray-400/30">
                                        <HiFingerPrint size={28} /*className={`${hola ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}*/ className="fill-gray-800/30" />
                                    </span>
                                    <input className="w-3/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-sm" placeholder="Password" type="text" />
                                </div>
                                <div className="border-b-2 border-black text-black">
                                    <Link href="/forget" >Forgot your password?</Link>
                                </div>
                                <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform">Sign In</button>
                            </div>
                        }
                        {signUpForm &&
                            <div className="flex flex-col items-center gap-6">
                                <h2 className="text-sm font-bold text-sky-900">Sing up to DigitalDreams</h2>
                                <div className="flex flex-row justify-evenly items-center gap-4">
                                    {providers?.google && (
                                        <button
                                            className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                await signIn(providers.google.id)
                                            }}
                                        >
                                            <SvgGoogle />
                                        </button>
                                    )}
                                    {providers?.github && (
                                        <button
                                            className="border border-gray-500 rounded-full bg-white hover:scale-125 transition-transform p-1"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                await signIn(providers.github.id)
                                            }}
                                        >
                                            <Github />
                                        </button>
                                    )}
                                </div>
                                <p className="text-black">or use your email account</p>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center pl-2 bg-gray-400/30">
                                        <HiUser size={28} className="fill-gray-800/30" />
                                    </span>
                                    <input className="w-3/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-sm" placeholder="Username" type="text" />
                                </div>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center pl-2 bg-gray-400/30">
                                        <HiAtSymbol size={28} className="fill-gray-800/30" />
                                    </span>
                                    <input className="w-3/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-sm" placeholder="Email" type="text" />
                                </div>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center pl-2 bg-gray-400/30">
                                        <HiFingerPrint size={28} /*className={`${hola ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}*/ className="fill-gray-800/30" />
                                    </span>
                                    <input className="w-3/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-sm" placeholder="Password" type="text" />
                                </div>
                                <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform">Sign Up</button>
                            </div>
                        }
                        <div className="absolute top-2 right-2 text-3xl hover:scale-125 transition-transform text-black">
                            <Link href={'/'} >X</Link>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default SignIn