import styles from "./SignIn.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { validateSignIn } from "@/shared/util/validate";
import { getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Logo from "@/assets/img/Avatar.png";
import useMediaQuery from "@/shared/util/useMediaQuery";
import ProvidersLogin from "@/components/Auth/ProvidersLogin";
import Login from "@/components/Auth/Login";
import LoginMobile from "@/components/Auth/LoginMobile";
import { useSelector } from "react-redux";
import { selectOpenLogin, setOpenLogin } from "@/state/globalSlice";
import { useAppDispatch } from "@/state/store";
import { FormLValues, FormRValues } from "@/shared/util/types";

type Props = { session: any };
function SignIn({ session }: Props) {
  const login = useSelector(selectOpenLogin);
  const [mounted, setMounted] = useState<boolean>(false);
  const [signInForm, setSignInForm] = useState<boolean>(login);
  const [signUpForm, setSignUpForm] = useState<boolean>(!login);
  const [numLoginAttempts, setNumLoginAttempts] = useState<number>(0);
  const [containerClass, setContainerClass] = useState<string>("");
  // const [s, setLogin] = useState<boolean>(true)
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAboveSmallScreens = useMediaQuery("(min-width: 620px)");
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
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
  });
  const formikR = useFormik<FormRValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: onSubmitR,
  });
  const formikL = useFormik<FormLValues>({
    initialValues: {
      emailorusername: "",
      password: "",
    },
    validate: validateSignIn,
    onSubmit: onSubmitL,
  });
  async function onSubmitR(
    values: {
      username: string;
      email: string;
      password: string;
    },
    { resetForm }: { resetForm: any }
  ) {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          provider: "local",
        }),
      };
      fetch(`/api/auth/signup`, options)
        .then((res: Response) => res.json())
        .then((res) => {
          if (res.msg === "ok") {
            resetForm();
            setSignInForm(true);
            setSignUpForm(false);
            dispatch(setOpenLogin(true));
            handleSignIn();
            // router.push('/auth/SignIn')
          }
          if (res.msg !== "ok") {
            toast.error(res.msg, { duration: 5000 });
          }
        });
    } catch (error) {
      toast.error("An error occurred while registering.", { duration: 3000 });
      setSignUpForm(true);
      setSignInForm(false);
      dispatch(setOpenLogin(false));
      // router.push('/auth/SignIn')
    }
  }
  async function onSubmitL(
    values: { emailorusername: string; password: string },
    { resetForm }: { resetForm: any }
  ) {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.emailorusername,
        password: values.password,
        callbackUrl: "/",
      });
      if (response?.ok) {
        resetForm();
        router.push(router.query.callbackUrl as string);
      }
      if (response?.error) {
        setNumLoginAttempts(numLoginAttempts + 1);
        if (numLoginAttempts >= 3) {
          toast.error("Unable to login. Please register for an account.", {
            duration: 5000,
          });
        } else {
          toast.error("Something went wrong. Try again!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in", { duration: 5000 });
      setSignInForm(true);
      setSignUpForm(false);
      dispatch(setOpenLogin(true));
      // router.push('/auth/SignIn')
    }
  }
  useEffect(() => {
    setMounted(true);
    dispatch(setOpenLogin(login));
  }, [dispatch, login]);
  const handleSignIn = () => {
    setContainerClass("");
    dispatch(setOpenLogin(true));
  };
  if (!mounted) return null;
  return (
    <>
      <Head>
        <title>APP | Log in</title>
      </Head>
      {isAboveSmallScreens && (
        <Login
          formikR={formikR}
          formikL={formikL}
          login={login}
          handleSignIn={handleSignIn}
          setContainerClass={setContainerClass}
          containerClass={containerClass}
        />
      )}
      {!isAboveSmallScreens && (
        <LoginMobile
          formikR={formikR}
          formikL={formikL}
          login={login}
          signInForm={signInForm}
          setSignInForm={setSignInForm}
          signUpForm={signUpForm}
          setSignUpForm={setSignUpForm}
        />
      )}
      <Toaster position="top-left" reverseOrder={true} />
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { callbackUrl } = context.query;
  const referer = callbackUrl || "/";
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: referer,
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default SignIn;
