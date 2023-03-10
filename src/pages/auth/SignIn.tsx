// import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import styles from "./SignIn.module.css"
import * as Yup from 'yup';
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
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
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
    const [show, setShow] = useState<boolean>(false)
    const [containerClass, setContainerClass] = useState('');
    const isAboveSmallScreens = useMediaQuery("(min-width: 620px)");
    const { providers } = useInfoProviders()
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('El nombre de usuario es requerido'),
        email: Yup.string()
            .email('Ingresa un correo electrónico válido')
            .required('El correo electrónico es requerido'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('La contraseña es requerida'),
    })
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
        validationSchema
    });
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
                            <form className={`${stylesCenter} gap-4 py-6`} onSubmit={formik.handleSubmit}>
                                <h2 className="font-bold text-2xl md:text-3xl text-sky-900">Sign up to DigitalDreams</h2>
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
                            <form className={`${stylesCenter} gap-4 py-6`} onSubmit={formik.handleSubmit}>
                                <h2 className="font-bold text-2xl md:text-3xl text-sky-900">Sign in to DigitalDreams</h2>
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
                                <h2 className="text-sm font-bold text-sky-900">Sign in to DigitalDreams</h2>
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
                                    <span className="icon flex items-center p-2 rounded-l-sm bg-gray-400/30">
                                        <HiAtSymbol size={28} className="fill-gray-800/30" />
                                    </span>
                                    <input className={`w-3/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-r-sm`} placeholder="Email / Username" type="text" />
                                </div>
                                <div className="flex justify-center w-full ">
                                    <span className="icon flex items-center p-2 rounded-l-sm bg-gray-400/30">
                                        <HiFingerPrint size={28} /*className={`${hola ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}*/ className="fill-gray-800/30" />
                                    </span>
                                    <input className={`w-3/4 bg-gray-400/30 focus:outline-none text-gray-800 p-4 rounded-r-sm`} placeholder="Password" type="text" />
                                </div>
                                <div className="border-b-2 border-black text-black">
                                    <Link href="/forget" >Forgot your password?</Link>
                                </div>
                                <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform">Sign In</button>
                            </div>
                        }
                        {signUpForm &&
                            <form className="flex flex-col items-center gap-6" onSubmit={formik.handleSubmit}>
                                <h2 className="text-sm font-bold text-sky-900">Sign up to DigitalDreams</h2>
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
                                    <span className={`${formik.touched.username && formik.errors.username ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                        <HiUser size={28} className={`${!formik.errors.username && formik.values.username ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                    </span>
                                    <input className={`${formik.touched.username && formik.errors.username ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-3/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`} placeholder="Username" type="text" {...formik.getFieldProps('username')} name="username" />
                                </div>
                                {formik.touched.username && formik.errors.username ? (
                                    <div className="text-red-200">{formik.errors.username}</div>
                                ) : null}
                                <div className="flex justify-center w-full ">
                                    <span className={`${formik.touched.email && formik.errors.email ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                        <HiAtSymbol size={28} className={`${!formik.errors.email && formik.values.email ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                    </span>
                                    <input className={`${formik.touched.email && formik.errors.email ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-3/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`} placeholder="Email" type="text" {...formik.getFieldProps('email')} name="email" />
                                </div>
                                {/* {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-200">{formik.errors.email}</div>
                                ) : null} */}
                                <div className="flex justify-center w-full ">
                                    <span className={`${formik.touched.password && formik.errors.password ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                        <HiFingerPrint size={28} className={`${!formik.errors.password && formik.values.password ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                    </span>
                                    <div className="relative w-3/4">
                                        <input
                                            className={`${formik.touched.password && formik.errors.password ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-full focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                            placeholder="Password"
                                            type={`${show ? 'text' : 'password'}`}
                                            {...formik.getFieldProps('password')}
                                            name="password"
                                        />
                                        {
                                            !show &&
                                            <span
                                                className="absolute top-0 right-0 flex items-center px-2 py-4"
                                                onClick={() => setShow(!show)}
                                            >
                                                <AiFillEyeInvisible
                                                    size={28}
                                                    className={`${!formik.errors.password && formik.values.password ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}
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
                                                <AiFillEye size={28} className={`${!formik.errors.password && formik.values.password ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {/* {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-200">{formik.errors.password}</div>
                                ) : null} */}
                                <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform" type="submit">Sign Up</button>
                            </form>
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