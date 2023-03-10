// import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import styles from "./SignIn.module.css"
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { validateSignIn } from "@/shared/util/validate"
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import Logo from '@/assets/img/Avatar.png'
import useMediaQuery from "@/shared/util/useMediaQuery"
import ProvidersLogin from "@/components/Auth/ProvidersLogin";
import Login from "@/components/Auth/Login";
import LoginMobile from "@/components/Auth/LoginMobile";

type Props = {}
function SignIn(props: Props) {
    const [mounted, setMounted] = useState<boolean>(false)
    const router = useRouter()
    const isAboveSmallScreens = useMediaQuery("(min-width: 620px)");
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
    const formikR = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: onSubmitR,
    });
    const formikL = useFormik({
        initialValues: {
            emailorusername: '',
            password: '',
        },
        validate: validateSignIn,
        onSubmit: onSubmitL,
        // onSubmit: values => {
        //     alert(JSON.stringify(values, null, 2));
        // },
    });
    async function onSubmitR(values: {
        username: string
        email: string
        password: string
    }) {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                }),
            }
            fetch(`/api/auth/signup`, options)
                .then((res) => res.json())
                .then((res) => {
                    if (res.msg === 'ok') router.push('/auth/SignIn')
                })
        } catch (error) {
            toast.error('An error occurred while registering.', { duration: 3000 })
            router.push('/auth/SignIn')
        }
    }
    async function onSubmitL(values: { emailorusername: string; password: string }) {
        try {
            const response = await signIn('credentials', {
                redirect: true,
                email: values.emailorusername,
                password: values.password,
                callbackUrl: '/',
            })
            const yo = await JSON.stringify(response, null)
            console.log(response)
            // if (response.ok) router.push('/')
            console.log(yo)
            // if (!yo.includes('true')) {
            //     toast.error('Something went wrong. Try again!')
            // }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred while logging in', { duration: 5000 })
            router.push('/auth/SignIn')
        }
    }
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    // console.log(providers)
    return (
        <>
            <Head>
                <title>APP | Log in</title>
            </Head>
            {isAboveSmallScreens &&
                <Login formikR={formikR} />
            }
            {!isAboveSmallScreens &&
                <LoginMobile formikR={formikR} formikL={formikL} />
            }
        </>
    )
}

export default SignIn