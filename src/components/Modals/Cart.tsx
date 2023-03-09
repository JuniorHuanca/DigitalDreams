import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { cartData } from '@/shared/util/data';
import Button from '@/shared/components/Button/Button';
import { useTheme } from '@mui/material';
import { ITheme } from '@/shared/util/types';
import Image from 'next/image';

const Cart = () => {
  const theme: ITheme = useTheme();

  return (
    <div className="bg-black/60 w-full fixed nav-item top-0 right-0 ">
      <div className="float-right h-screen transition-all duration-1000 ease-in-out dark:text-gray-200 bg-slate-100 dark:bg-primary-500 md:w-400 p-8">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Shopping Cart</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="3xl"
            borderRadius="50%" bgColor={undefined} text={undefined} width={undefined} title='cart' />
        </div>
        <div className="ss:max-h-[70vh] h-[90%] max-h-[80.5vh] flex flex-col justify-start">
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {cartData?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="flex items-center leading-8 gap-5 border-b-2 hover:bg-slate-300 border-blue-500 dark:border-gray-600 dark:hover:bg-primary-600 p-4">
                    <div className="flex h-24 w-24 overflow-hidden">
                      <Image className="rounded-lg" src={item.image} alt="" />
                    </div>
                    <div>
                      <p className="font-semibold ">{item.name}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{item.category}</p>
                      <div className="flex gap-4 mt-2 items-center">
                        <p className="font-semibold text-lg">{item.price}</p>
                        <div className="flex items-center border-1 border-r-0 border-color rounded">
                          <p className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 "><AiOutlineMinus /></p>
                          <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">0</p>
                          <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"><AiOutlinePlus /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
            <p className="font-semibold">$890</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 dark:text-gray-200">Total</p>
            <p className="font-semibold">$890</p>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className={`flex justify-center items-center gap-4 text-lg text-white p-1 w-full hover:bg-blue-600 bg-blue-500 dark:hover:bg-primary-400 dark:bg-primary-800 rounded-lg hover:scale-105 transition-transform`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
