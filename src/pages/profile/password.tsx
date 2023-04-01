import Layout from "@/components/Layouts/Layout"
import LayoutProfile from "@/components/Layouts/LayoutProfile"
import Head from "next/head"
import * as Yup from 'yup';
import { useState } from "react"
import { useFormik } from "formik";
import { HiFingerPrint } from "react-icons/hi";
import { handleBlurPassword } from "@/shared/util/validate";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type Props = {}

const Password = (props: Props) => {
    const [showCurrentPass, setShowCurrentPass] = useState(false)
    const [showNewPass, setShowNewPass] = useState(false)
    const [showNewPassConf, setShowNewPassConf] = useState(false)

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required('Contraseña es obligatoria')
            .test(
                'no-blank-spaces',
                'La contraseña no debe contener espacios en blanco.',
                (value) => !!value && !value.includes(' ')
            ),
        newPassword: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required('La nueva contraseña es obligatoria')
            .test(
                'no-blank-spaces',
                'La contraseña no debe contener espacios en blanco.',
                (value) => !!value && !value.includes(' ')
            ),
        newPasswordConf: Yup.string()
            .required('Confirmar la contraseña es obligatorio')
            .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
    })
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            newPasswordConf: '',
            change: 'password'
        },
        validationSchema,
        onSubmit,
    });
    async function onSubmit(values: any, { resetForm }: any) {
        try {

        } catch (error) {

        }
    }
    return (
        <Layout>
            <Head>
                <title>Password</title>
            </Head>
            <div>
                <LayoutProfile>
                    <div className="w-full h-full">
                        <div className="flex flex-col items-center h-full">
                            <div className="flex flex-col w-full  h-full p-8 bg-slate-100 dark:bg-primary-500 rounded-lg">
                                <h1 className="text-xl sm:text-4xl font-bold mb-4">My Password</h1>
                                <form className='flex flex-col justify-center sm:justify-start' encType="multipart/form-data">
                                    
                                    <div className="flex justify-center w-full ">
                                        <span className={`${formik.touched.currentPassword && formik.errors.currentPassword ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                            <HiFingerPrint size={28} className={`${!formik.errors.currentPassword && formik.values.currentPassword ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                        </span>
                                        <div className="relative w-3/4 md:w-2/4">
                                            <input className={`${formik.touched.currentPassword && formik.errors.currentPassword ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-full  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                                placeholder={formik.touched.currentPassword && formik.errors.currentPassword ? formik.errors.currentPassword : 'Password'}
                                                type={`${showCurrentPass ? 'text' : 'password'}`}
                                                {...formik.getFieldProps('currentPassword')}
                                                onBlur={(e) => {
                                                    formik.handleBlur(e)
                                                    handleBlurPassword(e)
                                                }} />
                                            {
                                                !showCurrentPass &&
                                                <span
                                                    className="absolute top-0 right-0 flex items-center px-2 py-4"
                                                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                                                >
                                                    <AiFillEyeInvisible
                                                        size={28}
                                                        className={`${!formik.errors.currentPassword && formik.values.currentPassword ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}
                                                    />
                                                </span>
                                            }
                                            {
                                                showCurrentPass && <span
                                                    className="absolute top-0 right-0 flex items-center px-2 py-4"
                                                    onClick={() =>
                                                        setShowCurrentPass(!showCurrentPass)
                                                    }
                                                >
                                                    <AiFillEye size={28} className={`${!formik.errors.currentPassword && formik.values.currentPassword ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                                </span>
                                            }
                                        </div>
                                    </div>

                                    <div className="flex justify-center w-full ">
                                        <span className={`${formik.touched.currentPassword && formik.errors.currentPassword ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                            <HiFingerPrint size={28} className={`${!formik.errors.currentPassword && formik.values.currentPassword ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                        </span>
                                        <div className="relative w-3/4 md:w-2/4">
                                            <input className={`${formik.touched.currentPassword && formik.errors.currentPassword ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-full  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                                placeholder={formik.touched.currentPassword && formik.errors.currentPassword ? formik.errors.currentPassword : 'Password'}
                                                type={`${showCurrentPass ? 'text' : 'password'}`}
                                                {...formik.getFieldProps('currentPassword')}
                                                onBlur={(e) => {
                                                    formik.handleBlur(e)
                                                    handleBlurPassword(e)
                                                }} />
                                            {
                                                !showCurrentPass &&
                                                <span
                                                    className="absolute top-0 right-0 flex items-center px-2 py-4"
                                                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                                                >
                                                    <AiFillEyeInvisible
                                                        size={28}
                                                        className={`${!formik.errors.currentPassword && formik.values.currentPassword ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}
                                                    />
                                                </span>
                                            }
                                            {
                                                showCurrentPass && <span
                                                    className="absolute top-0 right-0 flex items-center px-2 py-4"
                                                    onClick={() =>
                                                        setShowCurrentPass(!showCurrentPass)
                                                    }
                                                >
                                                    <AiFillEye size={28} className={`${!formik.errors.currentPassword && formik.values.currentPassword ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                                </span>
                                            }
                                        </div>
                                    </div>

                                    <div className="flex justify-center w-full ">
                                        <span className={`${formik.touched.currentPassword && formik.errors.currentPassword ? 'bg-red-400' : 'bg-gray-400/30'} selection:icon flex items-center p-2 rounded-l-sm`}>
                                            <HiFingerPrint size={28} className={`${!formik.errors.currentPassword && formik.values.currentPassword ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                        </span>
                                        <div className="relative w-3/4 md:w-2/4">
                                            <input className={`${formik.touched.currentPassword && formik.errors.currentPassword ? 'border-2 border-red-400 placeholder:text-red-400' : ''} bg-gray-400/30 w-full  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
                                                placeholder={formik.touched.currentPassword && formik.errors.currentPassword ? formik.errors.currentPassword : 'Password'}
                                                type={`${showCurrentPass ? 'text' : 'password'}`}
                                                {...formik.getFieldProps('currentPassword')}
                                                onBlur={(e) => {
                                                    formik.handleBlur(e)
                                                    handleBlurPassword(e)
                                                }} />
                                            {
                                                !showCurrentPass &&
                                                <span
                                                    className="absolute top-0 right-0 flex items-center px-2 py-4"
                                                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                                                >
                                                    <AiFillEyeInvisible
                                                        size={28}
                                                        className={`${!formik.errors.currentPassword && formik.values.currentPassword ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`}
                                                    />
                                                </span>
                                            }
                                            {
                                                showCurrentPass && <span
                                                    className="absolute top-0 right-0 flex items-center px-2 py-4"
                                                    onClick={() =>
                                                        setShowCurrentPass(!showCurrentPass)
                                                    }
                                                >
                                                    <AiFillEye size={28} className={`${!formik.errors.currentPassword && formik.values.currentPassword ? 'fill-[#6366f1]' : 'fill-gray-800/30'}`} />
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </LayoutProfile>
            </div>
        </Layout>
    )
}

export default Password