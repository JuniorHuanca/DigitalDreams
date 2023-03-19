import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from '@/assets/img/Avatar.png';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { handleBlurEmail } from "@/shared/util/validate";
import { HiAtSymbol } from "react-icons/hi";
import Head from "next/head";
import { getSession } from "next-auth/react";
type Props = {}

const RestorePassword = (props: Props) => {
    const router = useRouter()
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
    })
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit,
    });
    async function onSubmit(values: {
        email: string
    }, { resetForm }: { resetForm: any }) {
        try {
            const response = await axios.put(`/api/auth/resetpassword`, {
                email: values.email,
            })
            if (response.status === 200) {
                resetForm()
                router.push('/auth/SignIn')
            } else {
                toast.error('Sorry, something went wrong. Please try again later.', { duration: 5000 })
            }
        } catch (error) {
            toast.error('Sorry, something went wrong', { duration: 5000 })
        }
    }


    return (
        <div className="flex justify-center items-center h-screen p-4">
            <Head>
                <title>Reset Password </title>
            </Head>
            <div className="relative flex flex-col gap-4 bg-white w-full xs:w-[80%] min-h-[80%] p-4 rounded-xl">
                <form className="flex flex-col items-center gap-6" onSubmit={formik.handleSubmit}>
                    <h2 className="text-2xl font-bold text-sky-900">Reset Password</h2>
                    <div className="w-40 h-40">
                        <Image src={Logo} alt="Logo" className="rounded-full p-2" />
                    </div>
                    <p className="text-black text-center">Please enter your email address associated with your account. We will send you a temporary new password so you can log in right away.</p>
                    <div className="flex justify-center w-full ">
                        <span className={`${formik.touched.email && formik.errors.email ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                            <HiAtSymbol size={28} className={`${!formik.errors.email && formik.values.email ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                        </span>
                        <input className={`${formik.touched.email && formik.errors.email ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-3/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                            placeholder={formik.touched.email && formik.errors.email ? formik.errors.email : 'Email / Username'}
                            type="text"
                            {...formik.getFieldProps('email')} onBlur={(e) => {
                                formik.handleBlur(e)
                                handleBlurEmail(e)
                            }} />
                    </div>
                    <div className="flex justify-evenly w-full">
                        <button className="bg-sky-900 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform" type="submit">Continue</button>
                        <Link href={'/auth/SignIn'}>
                            <div className="bg-rose-800 py-4 px-10 rounded-3xl border hover:scale-125 transition-transform">
                                Cancel
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
            <Toaster
                position="top-left"
                reverseOrder={true}
            />
        </div>
    )
}

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context)
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {
            session
        }
    }
}
export default RestorePassword