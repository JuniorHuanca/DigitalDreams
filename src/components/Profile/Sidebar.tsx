import Link from "next/link"
import { CgProfile } from 'react-icons/cg'
import { FaClipboardList } from "react-icons/fa"
import { MdPassword, MdReviews } from "react-icons/md"
import { AiFillHeart } from "react-icons/ai"
type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div className="flex flex-col items-center justify-evenly h-full w-[20%] bg-slate-100 dark:bg-primary-500 rounded-lg">
            <Link href={'/'}><div className="w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base">My profile <CgProfile  className="text-2xl"/></div></Link>
            <Link href={'/'}><div className="w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base">My password <MdPassword className="text-2xl"/></div></Link>
            <Link href={'/'}><div className="w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base">My orders <FaClipboardList className="text-2xl"/></div></Link>
            <Link href={'/'}><div className="w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base">My reviews <MdReviews className="text-2xl"/></div></Link>
            <Link href={'/'}><div className="w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base">My wishlist <AiFillHeart className="text-2xl"/></div></Link>
        </div>
    )
}

export default Sidebar