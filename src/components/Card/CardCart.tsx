import { IProductCart } from "@/shared/util/types";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import Image from "next/image";
import { useAppDispatch } from "@/state/store";
import {
  minusAllProducts,
  minusOneProduct,
  plusOneProduct,
} from "@/state/cart/cartSlice";
type Props = {
  item: IProductCart;
};

const CardCart = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const counterPlus = () => dispatch(plusOneProduct(item.id));
  const counterLess = () => dispatch(minusOneProduct(item.id));
  const removeAllProducts = () => dispatch(minusAllProducts(item.id));
  const subtotalCalculation = (quantity: number, price: number) =>
    quantity * price;
  return (
    <div className="flex items-center md:gap-5 gap-1 border-b-2 hover:bg-slate-300 border-slate-200 dark:border-primary-400 dark:hover:bg-primary-600 p-2">
      <div className="relative min-h-[60px] min-w-[60px] md:min-h-[96px] md:min-w-[96px] overflow-hidden">
        <Image className="rounded-lg" src={item.product.image} alt="" fill />
      </div>
      <div>
        <p className="font-semibold ">{item.product.name}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
          {item.product.subcategory.name}
        </p>
        <div className="flex gap-2 mt-2 items-center">
          <p className="font-semibold text-lg w-[35%] text-center">
            $ {subtotalCalculation(item.quantity, item.product.price)}
            {/* {item.product.price} */}
          </p>
          <div className="flex items-center border-2 border-r-0 border-l-0 border-slate-200 dark:border-primary-400 rounded">
            <button
              type="button"
              className="p-2 border-l-2 border-slate-200 dark:border-primary-400 text-red-600"
              onClick={
                () => (item.quantity > 1 ? counterLess() : null)
                // : setModalConfirmClear(true)
              }
            >
              <AiOutlineMinus />
            </button>
            <button className="p-2 border-r-2 border-l-2 border-slate-200 dark:border-primary-400 w-[40px]">
              {item.quantity}
            </button>
            <button
              type="button"
              className="p-2 border-r-2 border-slate-200 dark:border-primary-400 text-green-600"
              onClick={() =>
                item
                  ? item.quantity < item.product.stock
                    ? counterPlus()
                    : null
                  : null
              }
            >
              <AiOutlinePlus />
            </button>
            <button
              className="p-2 border-r-2 border-slate-200 dark:border-primary-400 text-red-600"
              onClick={removeAllProducts}
            >
              <BsTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCart;
