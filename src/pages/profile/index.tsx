import Layout from "@/components/Layouts/Layout";
import { useAppDispatch } from "@/state/store";
import { getOneUser, selectOneUser, selectOneUserStatus, updateImageOneUser } from "@/state/users/user/userSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { FaPencilAlt } from 'react-icons/fa';
import LayoutProfile from "@/components/Layouts/LayoutProfile";
import Profile from "@/components/Modals/Profile";
import { Toaster, toast } from "react-hot-toast";
import Head from "next/head";
import LoaderModal from "@/components/Loaders/LoaderModal";
interface ISession {
  data: any;
  status: string;
}
type Props = {
  session: any;
}

const Settings = (props: Props) => {
  const { data: session, status }: ISession = useSession();
  const user = useSelector(selectOneUser);
  const dispatch = useAppDispatch();
  const ref = useRef<any>(null);
  const [userUpdateImage, setUserUpdateImage] = useState({
    id: user?.id,
    image: user?.image,
  })
  const [seletUser, setSeletUser] = useState(null);
  const [pathImage, setPathImage] = useState<any>()
  useEffect(() => {
    dispatch(getOneUser(session?.user.email));
    setUserUpdateImage({
      id: user?.id,
      image: user?.image,
    })
  }, [session])
  // console.log(session)
  // console.log(userUpdateImage)
  const handleImageProfile = async () => {
    try {
      const response: any = await dispatch(updateImageOneUser(userUpdateImage));
      if (response?.error) {
        toast.error("An error occurred", { duration: 3000 });
      }
      if (!response?.error) {
        toast.success("Profile updated successfully", { duration: 3000 });
        await dispatch(getOneUser(user?.email));
        setSeletUser(null)
      }
    } catch (error) {
      toast.error("An error occurred", { duration: 3000 });
    }
  }
  return (
    <Layout>
      <Head>
        <title>Profile</title>
      </Head>
      <div>
        <LayoutProfile>
          <div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col justify-center w-full p-8 bg-slate-100 dark:bg-primary-500 rounded-lg">
                <h1 className="text-4xl font-bold mb-4">My profile</h1>
                <div className="flex items-center gap-4">
                  {pathImage ? <Image
                    className="rounded-full min-w-[200px] min-h-[200px]"
                    src={pathImage}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  /> : (user?.image ? <Image
                    className="rounded-full w-[200px] h-[200px]"
                    src={user?.image}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  /> : !user?.image && <Avatar name={user?.name} size="200" round={true} />)}
                  <div>
                    <p>Personaliza tu cuenta con una foto. La foto de perfil aparecerá en las aplicaciones y dispositivos que usan tu cuenta de Microsoft.</p>
                    <div className='flex'>
                      <input
                        ref={ref}
                        type="file"
                        className='hidden'
                        onChange={() => {
                          setUserUpdateImage({
                            ...userUpdateImage,
                            image: ref.current?.files[0]
                          })
                          const reader = new FileReader()
                          const file = ref.current?.files[0]
                          if (file) {  // Verifica si el archivo existe
                            reader.readAsDataURL(file)
                            reader.onload = function load() {
                              setPathImage(reader.result)
                            }
                          }
                        }}
                      />
                      <button className='text-xl font-semibold border border-slate-200 bg-slate-300 dark:bg-primary-600 dark:border-primary-400 hover:dark:bg-primary-400 hover:bg-slate-500 hover:bg-opacity-50 rounded-lg px-6 py-4' type="button" onClick={() => ref.current?.click()}>
                        Update image
                      </button>
                      <button className='text-xl font-semibold border border-slate-200 bg-slate-300 dark:bg-primary-600 dark:border-primary-400 hover:dark:bg-primary-400 hover:bg-slate-500 hover:bg-opacity-50 rounded-lg px-6 py-4' type="button" onClick={() => handleImageProfile()}>
                        Submit
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
                <div className="flex flex-col gap-4 w-full">
                  <h2 className="text-2xl font-bold">Account Password</h2>
                  <div className="flex gap-4">
                    <h3 className="w-2/4">Password:</h3>
                    <div className="border-2 border-black py-2 px-4">
                      {user?.password}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {seletUser && <Profile user={seletUser} setSeletUser={setSeletUser} />}
          </div>
          <Toaster
            position="top-left"
            reverseOrder={true}
          />
        </LayoutProfile>
      </div>
      {status === "loading" || user === null && <LoaderModal />}
    </Layout>
  )
}

export default Settings