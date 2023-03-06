import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { GiExitDoor, GiEntryDoor } from 'react-icons/gi';
import { BsPersonCircle } from 'react-icons/bs';

import Button from '@/shared/components/Button/Button';
import { userProfileData } from '@/shared/util/data';

import { useTheme } from '@mui/material';
import { ITheme } from '@/shared/util/types';
import { signIn, signOut } from 'next-auth/react';
type Props = {
  user: any
}

const UserProfile = ({ user }: Props) => {
  const theme: ITheme = useTheme();
  return (
    <div className="nav-item absolute right-1 top-16 bg-slate-100 dark:bg-primary-500 p-8 rounded-lg w-96 shadow-slate-700 shadow-sm dark:shadow-primary-800">
      <div className="flex justify-between gap-4">
        <p className="font-semibold text-2xl">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor=''
          size="3xl"
          borderRadius="50%" bgColor={undefined} text={undefined} width={undefined} title='userProfile' />
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex h-24 w-24 overflow-hidden text-8xl">
          {user && <img
            className="rounded-full"
            src={user?.image}
            alt={user?.name}
          />}
          {!user && <BsPersonCircle />}
        </div>
        {user && <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {user?.name} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  Email   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user?.email} </p>
        </div>}
        {!user && <div>
          <p className="font-semibold text-xl dark:text-gray-200"> Name </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  Email   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> user@gmail.com.example </p>
        </div>}
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-slate-300 cursor-pointer dark:hover:bg-primary-600">
            <button
              type="button"
              style={{ color: item.iconColor }}
              className=" text-xl rounded-lg p-3 bg-blue-600 dark:bg-slate-50"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
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

export default UserProfile;
