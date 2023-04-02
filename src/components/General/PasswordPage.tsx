import Image from "next/image"
import Link from "next/link"
import LoaderPassword from "../Loaders/LoaderPassword"

type Props = {}

function PasswordPage({ }: Props) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="md:w-[80%]">Please click on the pencil icon to begin the password change process. Remember to choose a secure and unique password, and make sure not to forget it. If you happen to forget your password, don&apos;t worry. You can recover it by clicking on the following link: <span className="border-b-2 border-black dark:border-white font-semibold">
                <Link href="/auth/restorepassword" >Forgot your password?</Link>
            </span>. Thank you for keeping your account safe!</p>
            <div className="w-full h-full">
                <LoaderPassword />
            </div>
        </div>

    )
}

export default PasswordPage