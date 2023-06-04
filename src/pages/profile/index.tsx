import Layout from "@/components/Layouts/Layout";
import { useAppDispatch } from "@/state/store";
import {
  getOneUser,
  selectOneUser,
  updateImageOneUser,
} from "@/state/users/user/userSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import LayoutProfile from "@/components/Layouts/LayoutProfile";
import Profile from "@/components/Modals/Profile";
import { Toaster, toast } from "react-hot-toast";
import Head from "next/head";
import LoaderModal from "@/components/Loaders/LoaderModal";
import useMediaQuery from "@/shared/util/useMediaQuery";
import { IUser } from "@/shared/util/types";
interface ISession {
  data: any;
  status: string;
}
type Props = {
  session: any;
};

const Settings = (props: Props) => {
  const [fileImg, setFileImg] = useState(null);
  const [seletUser, setSeletUser] = useState<IUser | null>(null);
  const [errorImage, setErrorImage] = useState(false);
  const [pathImage, setPathImage] = useState<any>();
  const { data: session, status }: ISession = useSession();
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const user = useSelector(selectOneUser);
  const dispatch = useAppDispatch();
  const ref = useRef<any>(null);
  const userUpdateImage = {
    id: user?.id,
    image: fileImg,
  };
  useEffect(() => {
    (async () => {
      await dispatch(getOneUser(session?.user.email));
    })();
  }, [session, dispatch]);
  const handleImageProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: any = await dispatch(updateImageOneUser(userUpdateImage));
      if (response?.error) {
        toast.error("An error occurred", { duration: 3000 });
      }
      if (!response?.error) {
        toast.success("Profile updated successfully", { duration: 3000 });
        await dispatch(getOneUser(user?.email));
        setSeletUser(null);
      }
    } catch (error) {
      toast.error("An error occurred", { duration: 3000 });
    }
  };
  return (
    <Layout title={"Profile"}>
      <div>
        <LayoutProfile>
          <div className="w-full sm:h-full">
            <div className="flex flex-col items-center sm:h-full">
              <div className="flex flex-col w-full sm:h-full py-4  sm:p-8 bg-slate-200 dark:bg-primary-500 rounded-lg">
                <h1 className="p-4 text-xl sm:text-4xl font-bold mb-4">
                  My profile
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {pathImage ? (
                    <Image
                      className="rounded-full min-w-[100px] min-h-[100px] sm:min-w-[200px] sm:min-h-[200px]"
                      src={pathImage}
                      alt="user"
                      priority
                      width={isAboveMediumScreens ? 200 : 125}
                      height={isAboveMediumScreens ? 200 : 125}
                      onError={() => setErrorImage(true)}
                    />
                  ) : user?.image && !errorImage ? (
                    <Image
                      className="rounded-full min-w-[100px] min-h-[100px] sm:min-w-[200px] sm:min-h-[200px]"
                      src={user?.image}
                      alt="user"
                      priority
                      width={isAboveMediumScreens ? 200 : 125}
                      height={isAboveMediumScreens ? 200 : 125}
                      onError={() => setErrorImage(true)}
                    />
                  ) : (
                    <Avatar
                      name={user?.name}
                      size={isAboveMediumScreens ? "200" : "125"}
                      round={true}
                    />
                  )}
                  <div>
                    <p className="h-16 overflow-scroll hide-scrollbar">
                      Customize your account and make it your own! Add a profile
                      picture that represents you and it will appear on your
                      profile within our app. Don&apos;t worry, we won&apos;t
                      share your data with anyone outside of our app! Your
                      profile picture will only be displayed within our app!
                    </p>
                    <form
                      className="flex justify-center sm:justify-start"
                      encType="multipart/form-data"
                      onSubmit={(e) => handleImageProfile(e)}
                    >
                      <input
                        ref={ref}
                        type="file"
                        className="hidden"
                        onChange={() => {
                          setFileImg(ref.current?.files[0]);
                          const reader = new FileReader();
                          const file = ref.current?.files[0];
                          if (file) {
                            // Verifica si el archivo existe
                            reader.readAsDataURL(file);
                            reader.onload = function load() {
                              setPathImage(reader.result);
                            };
                          }
                        }}
                      />
                      <button
                        className="text-sm sm:text-xl font-semibold border border-slate-200 bg-slate-300 dark:bg-primary-600 dark:border-primary-400 hover:dark:bg-primary-400 hover:bg-slate-500 hover:bg-opacity-50 rounded-lg px-6 py-4 mt-4 ml-4"
                        type="button"
                        onClick={() => ref.current?.click()}
                      >
                        Update image
                      </button>
                      {pathImage && (
                        <button
                          className="text-sm sm:text-xl font-semibold border border-slate-200 bg-slate-300 dark:bg-primary-600 dark:border-primary-400 hover:dark:bg-primary-400 hover:bg-slate-500 hover:bg-opacity-50 rounded-lg px-6 py-4 mt-4 ml-4"
                          type="submit"
                        >
                          Submit
                        </button>
                      )}
                    </form>
                  </div>
                </div>
                <div className="w-full border-[1px] border-slate-200 dark:border-primary-400 my-4"></div>
                <div className="flex flex-col gap-4 w-full overflow-hidden">
                  <h2 className="flex gap-4 font-bold text-lg sm:text-2xl">
                    Account Information{" "}
                    <button
                      onClick={() => setSeletUser(user)}
                      className="animate-bell-swing"
                    >
                      <FaPencilAlt />
                    </button>
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <h3 className="w-[30%]">Name:</h3>
                    <p className="border-2 border-slate-200 dark:border-primary-400 py-2 px-4">
                      {user?.name}
                    </p>
                  </div>
                  {user.provider === "local" && (
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                      <h3 className="w-[30%]">Username:</h3>
                      <p className="border-2 border-slate-200 dark:border-primary-400 py-2 px-4">
                        {user?.username}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <h3 className="w-[30%]">Email:</h3>
                    <p className="border-2 border-slate-200 dark:border-primary-400 py-2 px-4 overflow-hidden">
                      {user?.email}
                    </p>
                  </div>
                </div>
                {/* <div className="flex flex-col gap-4 w-full">
                  <h2 className="text-2xl font-bold">Account Password</h2>
                  <div className="flex gap-4">
                    <h3 className="w-2/4">Password:</h3>
                    <div className="border-2 border-black py-2 px-4">
                      {user?.password}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {seletUser && (
              <Profile user={seletUser} setSeletUser={setSeletUser} />
            )}
          </div>
          <Toaster position="top-left" reverseOrder={true} />
        </LayoutProfile>
      </div>
      {status === "loading" || (user === null && <LoaderModal />)}
    </Layout>
  );
};

export default Settings;
