import { formatDate } from "@/shared/util/backend";
import { IOrder } from "@/shared/util/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  order: IOrder;
  userId: string;
};

const CardOrder = ({ order, userId }: Props) => {
  const [showProducts, setShowProducts] = useState<boolean>(false);

  const toggleProducts = () => {
    setShowProducts(!showProducts);
  };

  return (
    <div className="bg-white dark:bg-indigo-900 shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Order ID: {order.id}</h2>
      <p className="mb-2">
        Products: <strong>{order.products.length}</strong>
      </p>
      <p className="mb-2">
        Full payment: <strong>${order.cost}</strong>
      </p>
      <p className="mb-2">Date: {formatDate(order.createdAt)}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
        onClick={toggleProducts}
      >
        {showProducts ? "Hide products" : "View products"}
      </button>

      {showProducts && (
        <div className="max-h-[300px] overflow-y-auto hide-scrollbar">
          <h3 className="text-lg font-bold">Products:</h3>
          {order.products.map((product) => (
            <>
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="flex items-center gap-4 hover:dark:bg-indigo-800 hover:bg-slate-300 font-semibold hover:text-primary-500 dark:hover:text-secondary-500 transition-all"
              >
                <div className="relative h-24 w-[30%]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                </div>
                <h4 className="w-[70%] text-md font-bold">{product.name}</h4>
              </Link>
              <hr className="my-2" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardOrder;
