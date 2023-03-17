import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/assets/img/Avatar.png'
import { useEffect, useState } from 'react'
import { HiAtSymbol, HiFingerPrint, HiUser } from 'react-icons/hi'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import ProvidersLogin from './ProvidersLogin'
import { MdOutlineCancel } from 'react-icons/md'
import { handleBlurEmail, handleBlurPassword, handleBlurUsername } from '@/shared/util/validate'
import { FormikProps } from 'formik';
import { FormLValues, FormRValues } from '@/shared/util/types'
import { useAppDispatch } from '@/state/store'
import { setOpenLogin } from '@/state/globalSlice'

type Props = {
    formikR: FormikProps<FormRValues>;
    formikL: FormikProps<FormLValues>;
    login: boolean;
    signInForm: boolean;
    setSignInForm: (value: boolean) => void;
    signUpForm: boolean;
    setSignUpForm: (value: boolean) => void;
}

const LoginMobile = ({ formikR, formikL, login, signInForm, setSignInForm, signUpForm, setSignUpForm }: Props) => {
    const [mounted, setMounted] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    useEffect(() => {
        setMounted(true)
        dispatch(setOpenLogin(login))
    }, [login, dispatch])
    return (
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
                        dispatch(setOpenLogin(true))
                    }}>SIGN IN</button>
                    <button className={`${signUpForm ? 'border-b-2 border-sky-900 text-black' : 'text-slate-500'} font-semibold mt-6 text-lg`} onClick={() => {
                        setSignUpForm(true)
                        setSignInForm(false)
                        dispatch(setOpenLogin(false))
                    }}>SIGN UP</button>
                </div>
                {signInForm && login &&
                    <form className="flex flex-col items-center gap-6" onSubmit={formikL.handleSubmit}>
                        <h2 className="text-sm font-bold text-sky-900">Sign in to DigitalDreams</h2>
                        <ProvidersLogin />
                        <p className="text-black">or use your email account</p>
                        <div className="flex justify-center w-full ">
                            <span className={`${formikL.touched.emailorusername && formikL.errors.emailorusername ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                <HiAtSymbol size={28} className={`${!formikL.errors.emailorusername && formikL.values.emailorusername ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                            </span>
                            <input className={`${formikL.touched.emailorusername && formikL.errors.emailorusername ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-3/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                placeholder={formikL.touched.password && formikL.errors.password ? formikL.errors.password : 'Email / Username'}
                                type="text"
                                {...formikL.getFieldProps('emailorusername')} onBlur={(e) => {
                                    formikL.handleBlur(e)
                                    handleBlurEmail(e)
                                }} />
                        </div>
                        <div className="flex justify-center w-full ">
                            <span className={`${formikL.touched.password && formikL.errors.password ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                <HiFingerPrint size={28} className={`${!formikL.errors.password && formikL.values.password ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                            </span>
                            <div className="relative w-3/4">
                                <input className={`${formikL.touched.password && formikL.errors.password ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-full  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                    placeholder={formikL.touched.password && formikL.errors.password ? formikL.errors.password : 'Password'}
                                    type={`${show ? 'text' : 'password'}`}
                                    {...formikL.getFieldProps('password')}
                                    onBlur={(e) => {
                                        formikL.handleBlur(e)
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
                        <div className="border-b-2 border-black text-black">
                            <Link href="/forget" >Forgot your password?</Link>
                        </div>
                        <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform">Sign In</button>
                    </form>
                }
                {signUpForm && !login &&
                    <form className="flex flex-col items-center gap-6" onSubmit={formikR.handleSubmit}>
                        <h2 className="text-sm font-bold text-sky-900">Sign up to DigitalDreams</h2>
                        <ProvidersLogin />
                        <p className="text-black">or use your email account</p>
                        <div className="flex justify-center w-full ">
                            <span className={`${formikR.touched.username && formikR.errors.username ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                <HiUser size={28} className={`${!formikR.errors.username && formikR.values.username ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                            </span>
                            <input className={`${formikR.touched.username && formikR.errors.username ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-3/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                placeholder={formikR.touched.username && formikR.errors.username ? formikR.errors.username : 'Username'}
                                type="text" {...formikR.getFieldProps('username')}
                                onBlur={(e) => {
                                    formikR.handleBlur(e)
                                    handleBlurUsername(e)
                                }} />
                        </div>
                        <div className="flex justify-center w-full ">
                            <span className={`${formikR.touched.email && formikR.errors.email ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                <HiAtSymbol size={28} className={`${!formikR.errors.email && formikR.values.email ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                            </span>
                            <input className={`${formikR.touched.email && formikR.errors.email ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-3/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                placeholder={formikR.touched.email && formikR.errors.email ? formikR.errors.email : 'Email'}
                                type="text" {...formikR.getFieldProps('email')}
                                onBlur={(e) => {
                                    formikR.handleBlur(e)
                                    handleBlurEmail(e)
                                }} />
                        </div>
                        <div className="flex justify-center w-full ">
                            <span className={`${formikR.touched.password && formikR.errors.password ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                <HiFingerPrint size={28} className={`${!formikR.errors.password && formikR.values.password ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                            </span>
                            <div className="relative w-3/4">
                                <input
                                    className={`${formikR.touched.password && formikR.errors.password ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-full focus:outline-none text-gray-800 p-4 rounded-r-sm`}
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
                        <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform" type="submit">Sign Up</button>
                    </form>
                }
                <div className="absolute top-0 right-0 text-3xl hover:scale-125 transition-transform text-black">
                    <Link href={'/'} ><MdOutlineCancel className="w-10 h-10" /></Link>
                </div>
            </div>
        </div >
    )
}

export default LoginMobile