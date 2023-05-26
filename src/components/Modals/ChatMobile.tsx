import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import Button from "@/shared/components/Button/Button";
import { chatData } from "@/shared/util/data";
import { useTheme } from "@mui/material";
import { ITheme } from "@/shared/util/types";
import Image from "next/image";

const ChatMobile = () => {
  const theme: ITheme = useTheme();

  return (
    <div className="nav-item md:right-52 md:right-400 absolute right-0 ss:right-5 top-16 transition-all duration-1000 ease-in-out bg-slate-100 dark:bg-primary-500 p-3 ss:p-8 ss:rounded-lg w-full ss:w-96 shadow-slate-700 shadow-sm dark:shadow-primary-800 ss:max-h-[700px] z-30">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Messages</p>
          <button
            type="button"
            className="text-white  text-xs rounded p-1 px-2 bg-orange"
          >
            5 New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel className="w-10 h-10" />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="3xl"
          borderRadius="50%"
          bgColor={undefined}
          text={undefined}
          width={undefined}
          title="chat"
        />
      </div>
      <div className="ss:max-h-[50vh] h-[90%] max-h-[80.5vh] flex flex-col justify-start">
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {chatData?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-5 border-b-1 border-color p-3 leading-8 cursor-pointer hover:bg-slate-300 dark:hover:bg-primary-600"
            >
              <div className="relative">
                {/* <Image
                className="rounded-full h-10 w-10"
                src={item.image}
                alt={item.message}
              /> */}
                <div className="flex h-16 w-16">
                  <Image
                    className="rounded-3xl"
                    src={item.image}
                    alt={item.message}
                    priority
                  />
                </div>
                <span className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1 bg-[#03C9D7]" />
              </div>
              <div>
                <p className="font-semibold dark:text-gray-200 ">
                  {item.message}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {item.desc}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <button
            type="button"
            className={`flex justify-center items-center gap-4 text-lg text-white p-1 w-full hover:bg-blue-600 bg-blue-500 dark:hover:bg-primary-400 dark:bg-primary-800 rounded-lg hover:scale-105 transition-transform`}
          >
            See all messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMobile;
