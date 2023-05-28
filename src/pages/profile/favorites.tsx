import CardFavorite from "@/components/Card/CardFavorite";
import Layout from "@/components/Layouts/Layout";
import LayoutProfile from "@/components/Layouts/LayoutProfile";
import Loader from "@/components/Loaders/Loader";
import LoaderModal from "@/components/Loaders/LoaderModal";
import Pagination from "@/components/Pagination";
import { EStateGeneric } from "@/shared/util/types";
import { selectCurrentPage } from "@/state/globalSlice";
import {
  cleanUpProductsFavorites,
  getAllFavorites,
  selectAllFavorites,
  selectAllFavoritesStatus,
  selectDeleteFavoriteStatus,
} from "@/state/profile/profile/profileSlice";
import { useAppDispatch } from "@/state/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiMessageAltError } from "react-icons/bi";
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
  const favoritesStatus = useSelector(selectAllFavoritesStatus);
  const deleteFavoriteStatus = useSelector(selectDeleteFavoriteStatus);
  const favorites = useSelector(selectAllFavorites);
  const isEmpty = favorites.length === 0;

  const itemsPerPage = 10;
  const currentPage = useSelector(selectCurrentPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favorites.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setMounted(true);
    (async () => {
      if (favoritesStatus === EStateGeneric.IDLE) {
        await dispatch(getAllFavorites(session?.user.id));
      }
    })();
    return () => {
      setMounted(false);
      if (favoritesStatus === EStateGeneric.SUCCEEDED) {
        dispatch(cleanUpProductsFavorites());
      }
    };
  }, [status, session, favoritesStatus]);
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
              <div className="flex flex-col w-full h-full bg-slate-200 dark:bg-primary-500 rounded-lg">
                <h1 className="p-4 text-xl sm:text-4xl font-bold mb-4">
                  My Favorites
                </h1>
                {favoritesStatus === EStateGeneric.SUCCEEDED && !isEmpty && (
                  <div className="w-full h-full flex flex-wrap justify-center gap-4 overflow-y-auto scroll-white">
                    {currentItems.map(
                      ({ userId, productId, product }, index) => (
                        <CardFavorite
                          key={index}
                          product={product}
                          userId={userId}
                          productId={productId}
                        />
                      )
                    )}
                  </div>
                )}
                {favoritesStatus === EStateGeneric.SUCCEEDED && isEmpty && (
                  <div className="flex flex-col justify-center items-center p-4 gap-4 sm:gap-2">
                    <p className="text-5xl sm:text-8xl">
                      <BiMessageAltError />
                    </p>
                    <h2 className="text-center text-4xl sm:text-5xl sm:text-start font-semibold">
                      You don&apos;t have favorite products yet
                    </h2>
                  </div>
                )}
                {favorites.length > itemsPerPage && (
                  <Pagination
                    items={favorites}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                  />
                )}
                {favoritesStatus === EStateGeneric.PENDING && (
                  <div className="w-full h-[70vh] flex justify-center items-center">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </LayoutProfile>
      </div>
      {deleteFavoriteStatus === EStateGeneric.PENDING && <LoaderModal />}
    </Layout>
  );
};

export default Favorites;
