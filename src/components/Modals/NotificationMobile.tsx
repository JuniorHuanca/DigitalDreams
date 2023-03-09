import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import Button from '@/shared/components/Button/Button';
import { chatData } from '@/shared/util/data';
import { useTheme } from '@mui/material';
import { ITheme } from '@/shared/util/types';
import Image from 'next/image';
const NotificationMobile = () => {
  const theme: ITheme = useTheme();
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 transition-all duration-1000 ease-in-out bg-slate-100 dark:bg-primary-500 p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Notifications</p>
          <button type="button" className="text-white text-xs rounded p-1 px-2 bg-orange-theme "> 5 New</button>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="3xl" borderRadius="50%" bgColor={undefined} text={undefined} width={undefined} title='notification' />
      </div>
      <div className="mt-5 ">
        {chatData?.map((item, index) => (
          <div key={index} className="flex items-center leading-8 gap-5 border-b-1 border-color p-3 hover:bg-slate-300 dark:hover:bg-primary-600">
            <div className="relative">
              <div className='flex h-16 w-16'>
                <Image className="rounded-3xl" src={item.image} alt={item.message} />
              </div>
              <span
                className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1 bg-[#FEC90F]"
              />
            </div>
            <div>
              <p className="font-semibold dark:text-gray-200">{item.message}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
        <div className="mt-5">
          <button
            type="button"
            className={`flex justify-center items-center gap-4 text-lg text-white p-1 w-full hover:bg-blue-600 bg-blue-500 dark:hover:bg-primary-400 dark:bg-primary-800 rounded-lg hover:scale-105 transition-transform`}
          >
            See all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationMobile;
