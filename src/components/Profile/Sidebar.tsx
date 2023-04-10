import Link from "next/link"
import { CgProfile } from 'react-icons/cg'
import { FaClipboardList } from "react-icons/fa"
import { MdPassword, MdReviews } from "react-icons/md"
import { AiFillHeart } from "react-icons/ai"
import { useRouter } from "next/router"
import useMediaQuery from "@/shared/util/useMediaQuery"
type Props = {}

const Sidebar = (props: Props) => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
    const router = useRouter();
    const { pathname } = router;
    const parts = pathname.split("/");

    const links = [{ name: 'profile', icon: <CgProfile className="text-4xl sm:text-2xl" /> }, { name: 'password', icon: <MdPassword className="text-4xl sm:text-2xl" /> }, { name: 'orders', icon: <FaClipboardList className="text-4xl sm:text-2xl" /> }, { name: 'reviews', icon: <MdReviews className="text-4xl sm:text-2xl" /> }, { name: 'wishlist', icon: <AiFillHeart className="text-4xl sm:text-2xl" /> }]


    return (
        <div className="sticky flex flex-col justify-evenly h-full w-[50px] sm:w-[20%] bg-slate-100 dark:bg-primary-500 rounded-lg">
            {isAboveMediumScreens ? links.map((e, index) => <Link href={`/profile/${e.name === 'profile' ? '' : e.name}`} key={index}><div className={`w-full flex justify-evenly items-center p-6 hover:dark:bg-primary-400 hover:bg-slate-200 text-base ${e.name === parts[parts.length - 1] ? 'text-secondary-500 dark:bg-primary-400 bg-slate-200' : ''}`}>My {e.name} {e.icon}</div></Link>)
                : <div>
                    {links.map((e, index) => <Link href={`/profile/${e.name === 'profile' ? '' : e.name}`} key={index}><div className={`w-full flex justify-evenly items-center py-6 hover:dark:bg-primary-400 hover:bg-slate-200 text-base ${e.name === parts[parts.length - 1] ? 'text-secondary-500 dark:bg-primary-400 bg-slate-200' : ''}`}>{e.icon}</div></Link>)}
                </div>
            }
        </div>
    )
}

export default Sidebar