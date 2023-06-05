import Layout from "@/components/Layouts/Layout";
import LayoutProfile from "@/components/Layouts/LayoutProfile";
import Head from "next/head";
import * as Yup from "yup";
import { FocusEvent, useEffect, useState } from "react";
import { FormikErrors, FormikProps, useFormik } from "formik";
import { HiFingerPrint } from "react-icons/hi";
import { handleBlurPassword } from "@/shared/util/validate";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { BiMessageAltError } from "react-icons/bi";
import Image from "next/image";
import PasswordPage from "@/components/General/PasswordPage";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { setLoader } from "@/state/globalSlice";
import { useAppDispatch } from "@/state/store";
import { getOneUser, selectOneUser } from "@/state/users/user/userSlice";
import { useSelector } from "react-redux";

type Props = {};
interface FormValues {
  currentPassword: string;
  newPassword: string;
  newPasswordConf: string;
  change: string;
}
interface ISession {
  data: any;
  status: string;
}
const Password = (props: Props) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectOneUser);
  const { data: session }: ISession = useSession();
  const [showForm, setShowForm] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showNewPassConf, setShowNewPassConf] = useState(false);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(8, "The password must be at least 8 characters")
      .required("Password is required")
      .matches(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/,
        "Password requires at least one capital letter, one number and a symbol."
      )
      .test(
        "no-blank-spaces",
        "The password must not include blank spaces.",
        (value) => !!value && !value.includes(" ")
      ),
    newPassword: Yup.string()
      .min(8, "The password must be at least 8 characters")
      .required("Password is required")
      .matches(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/,
        "Password requires at least one capital letter, one number and a symbol."
      )
      .test(
        "no-blank-spaces",
        "The password must not include blank spaces.",
        (value) => !!value && !value.includes(" ")
      ),
    newPasswordConf: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
  });
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConf: "",
      change: "password",
    },
    validationSchema,
    onSubmit,
  });
  async function onSubmit(values: any, { resetForm }: any) {
    dispatch(setLoader());
    try {
      const response = await axios.patch(`/api/user`, {
        user: { ...session?.user, ...values },
      });
      if (response.status === 201) {
        dispatch(setLoader());
        resetForm();
        toast.success(response.data.msg, { duration: 5000 });
      }
    } catch (error: any) {
      dispatch(setLoader());
      console.log(error);
      toast.error(error.response.data.msg, { duration: 8000 });
    }
  }
  const handleError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof FormValues;
    const fieldValue = e.target.value;
    const formErrors = formik.errors as FormikErrors<FormValues>;
    const fieldErrors = formErrors[fieldName];
    if (fieldErrors || !fieldValue) {
      toast.error(`${fieldErrors ? fieldErrors : fieldName} is required`, {
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getOneUser(session?.user.email));
    })();
  }, [session, dispatch]);
  return (
    <Layout title={"Password"}>
      <div>
        <LayoutProfile>
          <div className="w-full h-full">
            <div className="flex flex-col items-center h-full">
              {user?.provider === "local" && (
                <div className="flex flex-col w-full h-full bg-slate-200 dark:bg-primary-500 rounded-lg">
                  <h2 className="p-4 text-xl sm:text-4xl font-bold mb-4">
                    My password{" "}
                    <button
                      onClick={() => setShowForm(!showForm)}
                      className="animate-bell-swing"
                    >
                      <FaPencilAlt />
                    </button>
                  </h2>
                  {showForm ? (
                    <form
                      className="flex flex-col justify-center sm:justify-start"
                      encType="multipart/form-data"
                      onSubmit={formik.handleSubmit}
                    >
                      <label className="text-center w-full my-4">
                        Current password
                      </label>
                      <div className="flex justify-center w-full ">
                        <span
                          className={`${
                            formik.touched.currentPassword &&
                            formik.errors.currentPassword
                              ? "bg-red-400"
                              : "bg-gray-400/30"
                          } selection:icon flex items-center p-2 rounded-l-sm`}
                        >
                          <HiFingerPrint
                            size={28}
                            className={`${
                              !formik.errors.currentPassword &&
                              formik.values.currentPassword
                                ? "fill-[#6366f1]"
                                : "fill-gray-800/30"
                            }`}
                          />
                        </span>
                        <div className="relative w-3/4 md:w-2/4">
                          <input
                            className={`${
                              formik.touched.currentPassword &&
                              formik.errors.currentPassword
                                ? "border-2 border-red-400 placeholder:text-red-400"
                                : ""
                            } bg-gray-400/30 w-full  focus:outline-none text-gray-800 dark:text-white p-4 rounded-r-sm`}
                            placeholder={
                              formik.touched.currentPassword &&
                              formik.errors.currentPassword
                                ? formik.errors.currentPassword
                                : "Password"
                            }
                            type={`${showCurrentPass ? "text" : "password"}`}
                            {...formik.getFieldProps("currentPassword")}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              handleError(e);
                            }}
                          />
                          {!showCurrentPass && (
                            <span
                              className="absolute top-0 right-0 flex items-center px-2 py-4"
                              onClick={() =>
                                setShowCurrentPass(!showCurrentPass)
                              }
                            >
                              <AiFillEyeInvisible
                                size={28}
                                className={`${
                                  !formik.errors.currentPassword &&
                                  formik.values.currentPassword
                                    ? "fill-[#6366f1]"
                                    : "fill-gray-800/30"
                                }`}
                              />
                            </span>
                          )}
                          {showCurrentPass && (
                            <span
                              className="absolute top-0 right-0 flex items-center px-2 py-4"
                              onClick={() =>
                                setShowCurrentPass(!showCurrentPass)
                              }
                            >
                              <AiFillEye
                                size={28}
                                className={`${
                                  !formik.errors.currentPassword &&
                                  formik.values.currentPassword
                                    ? "fill-[#6366f1]"
                                    : "fill-gray-800/30"
                                }`}
                              />
                            </span>
                          )}
                        </div>
                      </div>
                      <label className="text-center w-full my-4">
                        New password
                      </label>
                      <div className="flex justify-center w-full ">
                        <span
                          className={`${
                            formik.touched.newPassword &&
                            formik.errors.newPassword
                              ? "bg-red-400"
                              : "bg-gray-400/30"
                          } selection:icon flex items-center p-2 rounded-l-sm`}
                        >
                          <HiFingerPrint
                            size={28}
                            className={`${
                              !formik.errors.newPassword &&
                              formik.values.newPassword
                                ? "fill-[#6366f1]"
                                : "fill-gray-800/30"
                            }`}
                          />
                        </span>
                        <div className="relative w-3/4 md:w-2/4">
                          <input
                            className={`${
                              formik.touched.newPassword &&
                              formik.errors.newPassword
                                ? "border-2 border-red-400 placeholder:text-red-400"
                                : ""
                            } bg-gray-400/30 w-full  focus:outline-none text-gray-800 dark:text-white p-4 rounded-r-sm`}
                            placeholder={
                              formik.touched.newPassword &&
                              formik.errors.newPassword
                                ? formik.errors.newPassword
                                : "Password"
                            }
                            type={`${showNewPass ? "text" : "password"}`}
                            {...formik.getFieldProps("newPassword")}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              handleError(e);
                            }}
                          />
                          {!showNewPass && (
                            <span
                              className="absolute top-0 right-0 flex items-center px-2 py-4"
                              onClick={() => setShowNewPass(!showNewPass)}
                            >
                              <AiFillEyeInvisible
                                size={28}
                                className={`${
                                  !formik.errors.newPassword &&
                                  formik.values.newPassword
                                    ? "fill-[#6366f1]"
                                    : "fill-gray-800/30"
                                }`}
                              />
                            </span>
                          )}
                          {showNewPass && (
                            <span
                              className="absolute top-0 right-0 flex items-center px-2 py-4"
                              onClick={() => setShowNewPass(!showNewPass)}
                            >
                              <AiFillEye
                                size={28}
                                className={`${
                                  !formik.errors.newPassword &&
                                  formik.values.newPassword
                                    ? "fill-[#6366f1]"
                                    : "fill-gray-800/30"
                                }`}
                              />
                            </span>
                          )}
                        </div>
                      </div>
                      <label className="text-center w-full my-4">
                        Confirm new password
                      </label>
                      <div className="flex justify-center w-full ">
                        <span
                          className={`${
                            formik.touched.newPasswordConf &&
                            formik.errors.newPasswordConf
                              ? "bg-red-400"
                              : "bg-gray-400/30"
                          } selection:icon flex items-center p-2 rounded-l-sm`}
                        >
                          <HiFingerPrint
                            size={28}
                            className={`${
                              !formik.errors.newPasswordConf &&
                              formik.values.newPasswordConf
                                ? "fill-[#6366f1]"
                                : "fill-gray-800/30"
                            }`}
                          />
                        </span>
                        <div className="relative w-3/4 md:w-2/4">
                          <input
                            className={`${
                              formik.touched.newPasswordConf &&
                              formik.errors.newPasswordConf
                                ? "border-2 border-red-400 placeholder:text-red-400"
                                : ""
                            } bg-gray-400/30 w-full  focus:outline-none text-gray-800 dark:text-white p-4 rounded-r-sm`}
                            placeholder={
                              formik.touched.newPasswordConf &&
                              formik.errors.newPasswordConf
                                ? formik.errors.newPasswordConf
                                : "Password"
                            }
                            type={`${showNewPassConf ? "text" : "password"}`}
                            {...formik.getFieldProps("newPasswordConf")}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              handleError(e);
                            }}
                          />
                          {!showNewPassConf && (
                            <span
                              className="absolute top-0 right-0 flex items-center px-2 py-4"
                              onClick={() =>
                                setShowNewPassConf(!showNewPassConf)
                              }
                            >
                              <AiFillEyeInvisible
                                size={28}
                                className={`${
                                  !formik.errors.newPasswordConf &&
                                  formik.values.newPasswordConf
                                    ? "fill-[#6366f1]"
                                    : "fill-gray-800/30"
                                }`}
                              />
                            </span>
                          )}
                          {showNewPassConf && (
                            <span
                              className="absolute top-0 right-0 flex items-center px-2 py-4"
                              onClick={() =>
                                setShowNewPassConf(!showNewPassConf)
                              }
                            >
                              <AiFillEye
                                size={28}
                                className={`${
                                  !formik.errors.newPasswordConf &&
                                  formik.values.newPasswordConf
                                    ? "fill-[#6366f1]"
                                    : "fill-gray-800/30"
                                }`}
                              />
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-evenly w-full py-6">
                        <button
                          type="submit"
                          className="bg-indigo-700 text-white py-4 px-3 xs:px-10 rounded-lg hover:scale-110 transition-all "
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <PasswordPage />
                  )}
                </div>
              )}
              {user?.provider !== "local" && (
                <div className="flex flex-col w-full h-full bg-slate-200 dark:bg-primary-500 rounded-lg">
                  <h2 className="p-4 text-xl sm:text-4xl font-bold mb-4">
                    My password
                  </h2>
                  <div className="flex flex-col justify-center items-center p-4 gap-4 sm:gap-2">
                    <p className="text-5xl sm:text-8xl">
                      <BiMessageAltError />
                    </p>
                    <h2 className="text-center text-lg sm:text-xl sm:text-start font-semibold">
                      This section is exclusively reserved for users who have
                      registered directly with our application. If you have
                      registered through a third-party service, we recommend
                      considering the option to create an account directly with
                      us in order to access this additional functionality.
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        </LayoutProfile>
      </div>
    </Layout>
  );
};

export default Password;
