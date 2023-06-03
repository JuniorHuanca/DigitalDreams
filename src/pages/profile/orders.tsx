import CardOrder from "@/components/Card/CardOrder";
import Layout from "@/components/Layouts/Layout";
import LayoutProfile from "@/components/Layouts/LayoutProfile";
import Loader from "@/components/Loaders/Loader";
import Pagination from "@/components/Pagination";
import { EStateGeneric } from "@/shared/util/types";
import { selectCurrentPage, setCurrentPage } from "@/state/globalSlice";
import {
  cleanUpOrders,
  getAllOrders,
  selectAllOrders,
  selectAllOrdersStatus,
} from "@/state/profile/profile/profileSlice";
import { useAppDispatch } from "@/state/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { useSelector } from "react-redux";
type Props = {};
interface ISession {
  data: any;
  status: string;
}
const Orders = (props: Props) => {
  const { data: session, status }: ISession = useSession();
  const [mounted, setMounted] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const ordersStatus = useSelector(selectAllOrdersStatus);
  const orders = useSelector(selectAllOrders);
  const isEmpty = orders.length === 0;

  const itemsPerPage = 9;
  const currentPage = useSelector(selectCurrentPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setMounted(true);
    dispatch(setCurrentPage(1));
    (async () => {
      if (ordersStatus === EStateGeneric.IDLE) {
        await dispatch(getAllOrders(session?.user.id));
      }
    })();
    return () => {
      setMounted(false);
      if (ordersStatus === EStateGeneric.SUCCEEDED) {
        dispatch(cleanUpOrders());
      }
    };
  }, [status, session, ordersStatus]);
  if (status === "loading" || !mounted) {
    return (
      <div className="w-screen h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <Layout title={"Orders"}>
      <div>
        <LayoutProfile>
          <div className="w-full h-full">
            <div className="flex flex-col items-center h-full">
              <div className="flex flex-col w-full h-full bg-slate-200 dark:bg-primary-500 rounded-lg">
                <h1 className="p-4 text-xl sm:text-4xl font-bold mb-4">
                  My Orders
                </h1>
                {ordersStatus === EStateGeneric.SUCCEEDED && !isEmpty && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  overflow-y-auto scroll-white">
                    {currentItems.map((order) => (
                      <CardOrder
                        key={order.id}
                        order={order}
                        userId={session?.user.id}
                      />
                    ))}
                  </div>
                )}
                {orders.length > itemsPerPage && (
                  <Pagination
                    items={orders}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                  />
                )}
                {ordersStatus === EStateGeneric.SUCCEEDED && isEmpty && (
                  <div className="flex flex-col justify-center items-center p-4 gap-4 sm:gap-2">
                    <p className="text-5xl sm:text-8xl">
                      <BsTicketPerforatedFill />
                    </p>
                    <h2 className="text-center text-4xl sm:text-5xl sm:text-start font-semibold">
                      You don&apos;t have orders yet
                    </h2>
                  </div>
                )}
                {ordersStatus === EStateGeneric.PENDING && (
                  <div className="w-full h-[70vh] flex justify-center items-center">
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

export default Orders;
