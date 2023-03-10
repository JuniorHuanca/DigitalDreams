import React from 'react';
import { MdOutlineCancel, MdAdminPanelSettings } from 'react-icons/md';
import { GiExitDoor, GiEntryDoor } from 'react-icons/gi';
import { BsPersonCircle } from 'react-icons/bs';

import Button from '@/shared/components/Button/Button';
import { userProfileData } from '@/shared/util/data';

import { useTheme } from '@mui/material';
import { ITheme } from '@/shared/util/types';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
type Props = {
  user: any
}

const UserProfileMobile = ({ user }: Props) => {
  const theme: ITheme = useTheme();
  return (
    <div className="nav-item absolute right-0 ss:right-1 top-16 transition-all duration-1000 ease-in-out bg-slate-100 dark:bg-primary-500 p-3 ss:p-8 rounded-lg w-full ss:w-96 shadow-slate-700 shadow-sm dark:shadow-primary-800">
      <div className="flex justify-between gap-2 ss:gap-4">
        <p className="font-semibold text-lg ss:text-2xl">User Profile</p>
        <Button
          icon={<MdOutlineCancel className="w-10 h-10" />}
          color="rgb(153, 171, 180)"
          bgHoverColor=''
          size="3xl"
          borderRadius="50%" bgColor={undefined} text={undefined} width={undefined} title='userProfile' />
      </div>
      <div className="flex gap-2 ss:gap-4 items-center">
        <div className="">
          {user && <img
            className="rounded-full"
            src={user?.image}
            alt={user?.name}
          />}
          {!user && <BsPersonCircle className="h-14 w-14 ss:h-24 ss:w-24" />}
        </div>
        {user && <div>
          <p className="font-semibold text-base ss:text-xl dark:text-gray-200"> {user?.name} </p>
          <p className="text-gray-500 text-xs ss:text-sm dark:text-gray-400">  Email   </p>
          <p className="flex flex-wrap text-gray-500 text-xs ss:text-sm font-semibold dark:text-gray-400"> {user?.email} </p>
        </div>}
        {!user && <div>
          <p className="font-semibold text-base ss:text-xl dark:text-gray-200"> Name </p>
          <p className="text-gray-500 text-xs ss:text-sm dark:text-gray-400">  Email   </p>
          <p className="flex flex-wrap text-gray-500 text-xs ss:text-sm font-semibold dark:text-gray-400"> user@gmail.com.example </p>
        </div>}
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-2 ss:gap-5 border-b-1 border-color p-4 hover:bg-slate-300 cursor-pointer dark:hover:bg-primary-600">
            <button
              type="button"
              style={{ color: item.iconColor }}
              className=" text-xl rounded-lg p-2 ss:p-3 bg-blue-600 dark:bg-slate-50"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
        {user?.role === 'Admin' && <Link href={'/dashboard'}>
          <div className="flex gap-2 ss:gap-5 border-b-1 border-color p-4 hover:bg-slate-300 cursor-pointer dark:hover:bg-primary-600">

            <button
              className=" text-xl rounded-lg p-2 ss:p-3 bg-blue-600 dark:bg-slate-50 text-primary-700"
            >
              <MdAdminPanelSettings />
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">Dashboard</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> Account and performance summary </p>
            </div>
          </div>
        </Link>}

      </div>
      <div className="mt-5">
        {user && <button
          type="button"
          className={`flex justify-center items-center gap-4 text-lg text-white p-3 w-full hover:bg-blue-600 bg-blue-500 dark:hover:bg-primary-400 dark:bg-primary-800 rounded-lg hover:scale-105 transition-transform`}
          onClick={() => signOut()}
        >
          Logout <GiExitDoor />
        </button>
        }
        {!user && <button
          type="button"
          className={`flex justify-center items-center gap-4 text-lg text-white p-3 w-full hover:bg-blue-600 bg-blue-500 dark:hover:bg-primary-400 dark:bg-primary-800 rounded-lg hover:scale-105 transition-transform`}
          onClick={() => signIn()}
        >
          Login <GiEntryDoor />
        </button>
        }

      </div>
    </div>

  );
};

export default UserProfileMobile;
