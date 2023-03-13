import React, { useEffect, useState } from 'react'
import ProvidersLogin from './ProvidersLogin'
import { HiAtSymbol, HiFingerPrint, HiUser } from 'react-icons/hi'
import Image from 'next/image'
import Logo from '@/assets/img/Avatar.png'
import Link from 'next/link'
import styles from './Login.module.css'
import { handleBlurEmail, handleBlurPassword, handleBlurUsername } from '@/shared/util/validate'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FormikProps } from 'formik'
import { FormLValues, FormRValues } from '@/shared/util/types'
import { useAppDispatch } from '@/state/store'
import { setOpenLogin } from '@/state/globalSlice'
type Props = {
    formikR: FormikProps<FormRValues>;
    formikL: FormikProps<FormLValues>;
    login: boolean;
    // setLogin: (value: boolean) => void;
}

const Login = ({ formikR, formikL, login }: Props) => {
    const [containerClass, setContainerClass] = useState<string>('');
    const [show, setShow] = useState<boolean>(false)
    const [mounted, setMounted] = useState<boolean>(false)
    const stylesCenter = "flex flex-col justify-center items-center"
    const dispatch = useAppDispatch()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const container = document.getElementById('container');
        containerClass ? container?.classList.add(containerClass) : container?.classList.remove('rightPanelActive')
    }, [containerClass]);
    const handleSignUp = () => {
        setContainerClass(styles.rightPanelActive);
        dispatch(setOpenLogin(false))
    };
    const handleSignIn = () => {
        setContainerClass('');
        dispatch(setOpenLogin(true))
    };
    if (!mounted) return null

    return (
        <div className={`${stylesCenter} min-h-[100vh] min-w-screen`}>

            <div className={`flex w-[95%] h-[80vh] rounded-xl overflow-hidden ${styles.container} ${containerClass}`} id="container">
                {!login && <div className={`flex flex-col gap-4 p-4 w-4/6 h-full bg-white absolute transition-all duration-700 ease-in-out ${styles.signUpContainer}`}>
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
                            <span className={`${formikR.touched.username && formikR.errors.username ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                <HiUser size={28} className={`${!formikR.errors.username && formikR.values.username ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                            </span>
                            <input className={`${formikR.touched.username && formikR.errors.username ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-3/4 md:w-2/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                placeholder={formikR.touched.username && formikR.errors.username ? formikR.errors.username : 'Username'}
                                {...formikR.getFieldProps('username')}
                                onBlur={(e) => {
                                    formikR.handleBlur(e)
                                    handleBlurUsername(e)
                                }}
                                type="text" />
                        </div>
                        <div className="flex justify-center w-full ">
                            <span className={`${formikR.touched.email && formikR.errors.email ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                <HiAtSymbol size={28} className={`${!formikR.errors.email && formikR.values.email ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                            </span>
                            <input className={`${formikR.touched.email && formikR.errors.email ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-3/4 md:w-2/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                placeholder={formikR.touched.email && formikR.errors.email ? formikR.errors.email : 'Email'}
                                type="text"
                                {...formikR.getFieldProps('email')}
                                onBlur={(e) => {
                                    formikR.handleBlur(e)
                                    handleBlurEmail(e)
                                }} />
                        </div>
                        <div className="flex justify-center w-full ">
                            <span className={`${formikR.touched.password && formikR.errors.password ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                <HiFingerPrint size={28} className={`${!formikR.errors.password && formikR.values.password ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                            </span>
                            <div className="relative w-3/4 md:w-2/4">
                                <input className={`${formikR.touched.password && formikR.errors.password ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-full  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                    placeholder={formikR.touched.password && formikR.errors.password ? formikR.errors.password : 'Password'}
                                    type={`${show ? 'text' : 'password'}`}
                                    {...formikR.getFieldProps('password')}
                                    onBlur={(e) => {
                                        formikR.handleBlur(e)
                                        handleBlurPassword(e)
                                    }} />
                                {
                                    !show &&
                                    <span
                                        className="absolute top-0 right-0 flex items-center px-2 py-4"
                                        onClick={() => setShow(!show)}
                                    >
                                        <AiFillEyeInvisible
                                            size={28}
                                            className={`${!formikR.errors.password && formikR.values.password ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}
                                        />
                                    </span>
                                }
                                {
                                    show && <span
                                        className="absolute top-0 right-0 flex items-center px-2 py-4"
                                        onClick={() =>
                                            setShow(!show)
                                        }
                                    >
                                        <AiFillEye size={28} className={`${!formikR.errors.password && formikR.values.password ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                    </span>
                                }
                            </div>
                        </div>
                        <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform">Sign Up</button>

                    </form>
                </div>}
                {login && <div className={`flex flex-col gap-4 p-4 w-4/6 h-full bg-white absolute transition-all duration-700 ease-in-out ${styles.signInContainer}`}>
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
                            <span className={`${formikR.touched.email && formikR.errors.email ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                <HiAtSymbol size={28} className={`${!formikR.errors.email && formikR.values.email ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                            </span>
                            <input className={`${formikR.touched.email && formikR.errors.email ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-3/4 md:w-2/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                placeholder="Email / Username"
                                type="text" />
                        </div>
                        <div className="flex justify-center w-full ">
                            <span className={`${formikR.touched.password && formikR.errors.password ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                <HiFingerPrint size={28} className={`${!formikR.errors.password && formikR.values.password ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                            </span>
                            <input className={`${formikR.touched.password && formikR.errors.password ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-3/4 md:w-2/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`} placeholder="Password" type="text" />
                        </div>
                        <div className="border-b-2 border-black text-black">
                            <Link href="/forget" >Forgot your password?</Link>
                        </div>
                        <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform">Sign In</button>

                    </form>
                </div>}

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