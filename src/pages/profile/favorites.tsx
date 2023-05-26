import Layout from "@/components/Layouts/Layout";
import LayoutProfile from "@/components/Layouts/LayoutProfile";
import Loader from "@/components/Loaders/Loader";
import { EStateGeneric } from "@/shared/util/types";
import {
  getAllFavorites,
  selectAllFavorites,
  selectAllFavoritesStatus,
} from "@/state/profile/favorites/favoritesSlice";
import { useAppDispatch } from "@/state/store";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
type Props = {};
interface ISession {
  data: any;
  status: string;
}
const Favorites = (props: Props) => {
  const { data: session, status }: ISession = useSession();
  const [mounted, setMounted] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const favoritesStatus = useSelector(selectAllFavoritesStatus);
  const favorites = useSelector(selectAllFavorites);
  useEffect(() => {
    setMounted(true);
    (async () => {
      if (router.isReady) {
        if (favoritesStatus === EStateGeneric.IDLE) {
          await dispatch(getAllFavorites(session?.user.id));
        }
      }
    })();

    return () => {
      setMounted(false);
    };
  }, [status, session]);
  console.log(session?.user.id);
  console.log(favoritesStatus);
  console.log(favorites);
  if (status === "loading" || !mounted) {
    return (
      <div className="w-screen h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <Layout title={"Favorites"}>
      <div>
        <LayoutProfile>
          <div className="w-full h-full">
            <div className="flex flex-col items-center h-full">
              <div className="flex flex-col w-full  h-full p-8 bg-slate-100 dark:bg-primary-500 rounded-lg">
                <h1 className="text-xl sm:text-4xl font-bold mb-4">
                  My Favorites
                </h1>
                <div></div>
                {favoritesStatus === EStateGeneric.PENDING && (
                  <div className="w-full h-[80vh] flex justify-center items-center">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </LayoutProfile>
      </div>
    </Layout>
  );
};

export default Favorites;
