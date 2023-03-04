import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import Button from '@/shared/components/Button/Button';
import { userProfileData } from '@/shared/util/data';

import { useTheme } from '@mui/material';
import { ITheme } from '@/shared/util/types';
type Props = {
  user: any
}
const UserProfile = ({ user }: Props) => {
  const theme: ITheme = useTheme();
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-indigo-800 p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-black">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%" bgColor={undefined} text={undefined} width={undefined} />
      </div>
      <div className="flex gap-5 items-center border-color border-b-1">
        <div className="flex h-24 w-24 overflow-hidden">
          <img
            className="rounded-full"
            src={user?.image}
            alt={user?.name}
          />
        </div>
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {user?.name} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  Email   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user?.email} </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
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
        <Button
          color="white"
          bgColor={theme.palette.primary[300]}
          text="Logout"
          borderRadius="10px"
          width="full" icon={undefined} bgHoverColor={undefined} size={undefined} />
      </div>
    </div>

  );
};

export default UserProfile;
