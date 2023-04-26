import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { cartData } from "@/shared/util/data";
import Button from "@/shared/components/Button/Button";
import { useTheme } from "@mui/material";
import { ITheme } from "@/shared/util/types";
import { allProductsCart } from "@/state/cart/cartSlice";
import { useSelector } from "react-redux";
import CardCart from "../Card/CardCart";
import getStripe from "@/shared/util/get-stripejs";
import { toast } from "react-hot-toast";

const Cart = () => {
  const theme: ITheme = useTheme();
  const cart = useSelector(allProductsCart);
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.product.price,
    0
  );
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    console.log(response);
    console.log(stripe);

    // if (response.statusCode === 500) return;
    if (!response.ok) return;
    const data = await response.json();
    console.log(data);

    toast.loading("Redirecting...");

    stripe?.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <div className="bg-black/60 w-full fixed nav-item top-0 right-0 z-30">
      <div className="float-right h-screen transition-all duration-1000 ease-in-out dark:text-gray-200 bg-slate-100 dark:bg-primary-500 md:w-[420px] p-8">
        {cart.length ? (
          <>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">Shopping Cart</p>
              <Button
                icon={<MdOutlineCancel />}
                color="rgb(153, 171, 180)"
                bgHoverColor="light-gray"
                size="3xl"
                borderRadius="50%"
                bgColor={undefined}
                text={undefined}
                width={undefined}
                title="cart"
              />
            </div>
            <div className="ss:max-h-[70vh] h-[90%] max-h-[80.5vh] flex flex-col justify-start">
              <div className="flex-1 overflow-y-auto hide-scrollbar">
                {cart?.map((item, index) => (
                  <CardCart item={item} key={index} />
                ))}
              </div>
            </div>
            <div className="mt-1 mb-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
                <p className="font-semibold">$ {totalPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-200">Descuento</p>
                <p className="font-semibold">$ {totalPrice}</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-500 dark:text-gray-200">Total</p>
                <p className="font-semibold">$ {totalPrice}</p>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className={`flex justify-center items-center gap-4 text-lg text-white p-1 w-full hover:bg-blue-600 bg-blue-500 dark:hover:bg-primary-400 dark:bg-primary-800 rounded-lg hover:scale-105 transition-transform`}
                onClick={handleCheckout}
              >
                Place Order
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">Shopping Cart</p>
              <Button
                icon={<MdOutlineCancel />}
                color="rgb(153, 171, 180)"
                bgHoverColor="light-gray"
                size="3xl"
                borderRadius="50%"
                bgColor={undefined}
                text={undefined}
                width={undefined}
                title="cart"
              />
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h2 className="font-bold text-2xl">Your Cart is empty</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
