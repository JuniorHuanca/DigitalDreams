import Link from "next/link"
import { CgProfile } from 'react-icons/cg'
import { FaClipboardList } from "react-icons/fa"
import { MdPassword, MdReviews } from "react-icons/md"
import { AiFillHeart } from "react-icons/ai"
import { useRouter } from "next/router"
type Props = {}

const Sidebar = (props: Props) => {
    const router = useRouter();
    const { pathname } = router;
    const parts = pathname.split("/");
    const links = [{ name: 'profile', icon: <CgProfile className="text-2xl" /> }, { name: 'password', icon: <MdPassword className="text-2xl" /> }, { name: 'orders', icon: <FaClipboardList className="text-2xl" /> }, { name: 'reviews', icon: <MdReviews className="text-2xl" /> }, { name: 'wishlist', icon: <AiFillHeart className="text-2xl" /> }]
    return (
        <div className="flex flex-col justify-evenly h-full w-[20%] bg-slate-100 dark:bg-primary-500 rounded-lg">
            {links.map((e, index) => <Link href={`/profile/${e.name === 'profile' ? '' : e.name}`} key={index}><div className={`w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base ${e.name === parts[parts.length - 1] ? 'text-secondary-500 bg-primary-400' : ''}`}>My {e.name} {e.icon}</div></Link>)}
            {/* <Link href={'/profile'}><div className="w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base">My profile <CgProfile className="text-2xl" /></div></Link>
            <Link href={'/profile/password'}><div className="w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base">My password <MdPassword className="text-2xl" /></div></Link>
            <Link href={'/profile/orders'}><div className="w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base">My orders <FaClipboardList className="text-2xl" /></div></Link>
            <Link href={'/profile/reviews'}><div className="w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base">My reviews <MdReviews className="text-2xl" /></div></Link>
            <Link href={'/profile/wishlist'}><div className="w-full flex justify-evenly items-center p-6 hover:bg-primary-400 text-base">My wishlist <AiFillHeart className="text-2xl" /></div></Link> */}
        </div>
    )
}

export default Sidebar