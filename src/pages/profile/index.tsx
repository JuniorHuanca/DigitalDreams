import Layout from "@/components/Layouts/Layout";
import Loader from "@/components/Loaders/Loader";
import { EStateGeneric } from "@/shared/util/types";
import { useAppDispatch } from "@/state/store";
import { getOneUser, selectOneUser, selectOneUserStatus } from "@/state/users/user/userSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { FaPencilAlt } from 'react-icons/fa';
import LayoutProfile from "@/components/Layouts/LayoutProfile";
import Profile from "@/components/Modals/Profile";
import { Toaster } from "react-hot-toast";
interface ISession {
  data: any;
  status: string;
}
type Props = {}

const Settings = (props: Props) => {
  const { data: session, status }: ISession = useSession();
  const user = useSelector(selectOneUser);
  const userStatus = useSelector(selectOneUserStatus);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ref = useRef<any>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const [seletUser, setSeletUser] = useState(null);
  if (status === "loading") {
    <Loader />
  }
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        if (userStatus === EStateGeneric.IDLE) {
          await dispatch(getOneUser(session?.user.email));
        }
      }
    })()
  }, [userStatus, user])
  return (
    <Layout>
      <LayoutProfile>
        <div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col justify-center w-full p-8 bg-slate-100 dark:bg-primary-500 rounded-lg">
              <h1 className="text-4xl font-bold mb-4">My profile</h1>
              <div className="flex items-center gap-4">
                {user?.image && !imageError ? <Image
                  className="rounded-full"
                  src={user?.image}
                  alt="user"
                  width={"200px"}
                  height={"200px"}
                  onError={() => setImageError(true)}
                /> : user?.image && <Avatar name={user?.name} size="200" round={true} />}
                {!user?.image && <Avatar name={user?.name} size="200" round={true} />}
                <Image src={user?.image}></Image>
                <div>
                  <p>Personaliza tu cuenta con una foto. La foto de perfil aparecerá en las aplicaciones y dispositivos que usan tu cuenta de Microsoft.</p>
                  <div className='flex'>
                    <input
                      ref={ref}
                      type="file"
                      className='hidden'
                    />
                    <button className='text-xl font-semibold border border-slate-200 dark:border-primary-400 hover:bg-gray-300 hover:bg-opacity-50 rounded-lg px-6 py-4' type="button" onClick={() => ref.current?.click()}>
                      Update image
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full border-[1px] border-slate-200 dark:border-primary-400 my-4"></div>
              <div className="flex flex-col gap-4 w-full">
                <h2 className="flex  gap-4 text-2xl font-bold">Account Information <button onClick={() => setSeletUser(user)}><FaPencilAlt /></button></h2>
                <div className="flex gap-4">
                  <h3 className="w-2/4">Name:</h3>
                  <div className="border-2 border-slate-200 dark:border-primary-400 py-2 px-4">
                    {user?.name}
                  </div>
                </div>
                <div className="flex gap-4">
                  <h3 className="w-2/4">Username:</h3>
                  <div className="border-2 border-slate-200 dark:border-primary-400 py-2 px-4">
                    {user?.username}
                  </div>
                </div>
                <div className="flex gap-4">
                  <h3 className="w-2/4">Email:</h3>
                  <div className="border-2 border-slate-200 dark:border-primary-400 py-2 px-4">
                    {user?.email}
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col gap-4 w-full">
              <h2 className="text-2xl font-bold">Account Password</h2>
              <div className="flex gap-4">
                <h3 className="w-2/4">Password:</h3>
                <div className="border-2 border-black py-2 px-4">
                  {user.password}
                </div>
              </div>
            </div> */}
            </div>
          </div>
          {seletUser && <Profile user={seletUser} setSeletUser={setSeletUser} />}
        </div>
        <Toaster
          position="top-left"
          reverseOrder={true}
        />
      </LayoutProfile>
    </Layout >
  )
}

export default Settings