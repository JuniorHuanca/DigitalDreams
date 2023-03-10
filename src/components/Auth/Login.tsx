import React, { useEffect, useState } from 'react'
import ProvidersLogin from './ProvidersLogin'
import { HiAtSymbol, HiFingerPrint, HiUser } from 'react-icons/hi'
import Image from 'next/image'
import Logo from '@/assets/img/Avatar.png'
import Link from 'next/link'
import styles from './Login.module.css'
type Props = {
    formikR: any
}

const Login = ({ formikR }: Props) => {
    const [containerClass, setContainerClass] = useState<string>('');
    const [mounted, setMounted] = useState<boolean>(false)
    const stylesCenter = "flex flex-col justify-center items-center"

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

    return (
        <div className={`${stylesCenter} min-h-[100vh] min-w-screen`}>

            <div className={`flex w-[95%] h-[80vh] rounded-xl overflow-hidden ${styles.container} ${containerClass}`} id="container">
                <div className={`flex flex-col gap-4 p-4 w-4/6 h-full bg-white absolute transition-all duration-700 ease-in-out ${styles.signUpContainer}`}>
                    <div className="flex w-full h-[12%] items-center">
                        <div className="w-12 h-12">
                            <Image src={Logo} alt="Logo" className="rounded-full p-2" />
                        </div>
                        <p className="px-4  text-black">DigitalDreams</p>
                    </div>
                    <form className={`${stylesCenter} gap-4 py-6`} onSubmit={formikR.handleSubmit}>
                        <h2 className="font-bold text-2xl md:text-3xl text-sky-900">Sign up to DigitalDreams</h2>
                        <ProvidersLogin />
                        <p className="text-black">or use your email account</p>
                        <div className="flex justify-center w-full ">
                            <span className="icon flex items-center p-2 rounded-l-sm bg-gray-400/30">
                                <HiUser size={28} className="fill-gray-800/30" />
                            </span>
                            <input className="w-3/4 md:w-2/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-r-sm" placeholder="Username" type="text" />
                        </div>
                        <div className="flex justify-center w-full ">
                            <span className="icon flex items-center p-2 rounded-l-sm bg-gray-400/30">
                                <HiAtSymbol size={28} className="fill-gray-800/30" />
                            </span>
                            <input className="w-3/4 md:w-2/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-r-sm" placeholder="Email" type="text" />
                        </div>
                        <div className="flex justify-center w-full ">
                            <span className="icon flex items-center p-2 rounded-l-sm bg-gray-400/30">
                                <HiFingerPrint size={28} /*className={`${hola ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}*/ className="fill-gray-800/30" />
                            </span>
                            <input className="w-3/4 md:w-2/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-r-sm" placeholder="Password" type="text" />
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
                    <form className={`${stylesCenter} gap-4 py-6`} onSubmit={formikR.handleSubmit}>
                        <h2 className="font-bold text-2xl md:text-3xl text-sky-900">Sign in to DigitalDreams</h2>
                        <ProvidersLogin />
                        <p className="text-black">or use your email account</p>
                        <div className="flex justify-center w-full ">
                            <span className="icon flex items-center p-2 rounded-l-sm bg-gray-400/30">
                                <HiAtSymbol size={28} className="fill-gray-800/30" />
                            </span>
                            <input className="w-3/4 md:w-2/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-r-sm" placeholder="Email / Username" type="text" />
                        </div>
                        <div className="flex justify-center w-full ">
                            <span className="icon flex items-center p-2 rounded-l-sm bg-gray-400/30">
                                <HiFingerPrint size={28} /*className={`${hola ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}*/ className="fill-gray-800/30" />
                            </span>
                            <input className="w-3/4 md:w-2/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-r-sm" placeholder="Password" type="text" />
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
    )
}

export default Login