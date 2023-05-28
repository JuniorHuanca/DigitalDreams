import { IProduct } from "@/shared/util/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsFillHeartFill, BsFillHeartbreakFill } from "react-icons/bs";
import Confirmation from "../Modals/Confirmation";
import { useAppDispatch } from "@/state/store";
import {
  deleteOneFavorite,
  getAllFavorites,
} from "@/state/profile/profile/profileSlice";
import { toast } from "react-hot-toast";

type Props = {
  product: IProduct;
  userId: string;
  productId: number;
  // setDeleteFavoriteModal: (value: boolean) => void;
};

const CardFavorite = ({ product, userId, productId }: Props) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(true);
  const [deleteFavoriteModal, setDeleteFavoriteModal] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleDeleteFavorite = async () => {
    const res = await dispatch(deleteOneFavorite({ userId, productId }));
    if (res.payload.success) {
      toast.success("The product was removed from your favorites");
    }
    await dispatch(getAllFavorites(userId));
  };
  return (
    <div className="relative flex flex-col items-center p-2 max-w-[90%] min-w-[90%] xs:max-w-[240px] xs:min-w-[240px] h-[400px] xs:h-[350px] bg-gradient-to-b rounded-xl dark:from-primary-500 dark:to-primary-700 from-slate-50 to-white dark:shadow-indigo-500 transition-all">
      <Link
        href={`/product/${product.id}`}
        className="w-full relative h-[57%] rounded-xl overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </Link>
      <Link
        href={`/product/${product.id}`}
        className="w-full h-[27%] text-center mt-5"
      >
        {product.name}
      </Link>
      <Link
        href={`/products/brand?name=${product.brand.name}`}
        className="w-full h-[8%] text-center font-semibold"
      >
        {product.brand.name}
      </Link>
      <Link
        href={`/product/${product.id}`}
        className="w-full h-[8%] text-center font-semibold text-lg"
      >
        US $ {product.price}
      </Link>
      <button
        className="absolute top-[15px] right-[15px] flex justify-center items-center gap-2 rounded-xl border-none bg-transparent"
        onMouseEnter={() => setIsFavorite(false)}
        onMouseLeave={() => setIsFavorite(true)}
        onClick={() => setDeleteFavoriteModal(true)}
      >
        {isFavorite ? (
          <BsFillHeartFill
            className={`w-8 h-8 cursor-pointer  ${
              isFavorite ? "fill-[#fd1853]" : "fill-black"
            }`}
          />
        ) : (
          <BsFillHeartbreakFill
            className={`w-8 h-8 hover:scale-125 cursor-pointer transition-all fill-[#fd1853] hover:fill-black ${
              isFavorite ? "fill-[#fd1853]" : "fill-black"
            }`}
          />
        )}
      </button>
      {deleteFavoriteModal && (
        <Confirmation
          cancel={setDeleteFavoriteModal}
          customFuntion={handleDeleteFavorite}
          title={"Delete Favorite"}
          text={"Do you want to remove this product from the favorites list?"}
        />
      )}
    </div>
  );
};

export default CardFavorite;
