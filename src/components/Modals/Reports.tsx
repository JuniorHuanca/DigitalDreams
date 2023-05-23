import { signIn } from "next-auth/react";
import { GiEntryDoor } from "react-icons/gi";
import Image from 'next/image'
import Logo from '@/assets/img/Avatar.png'
type Props = {
  setShowModal: (value: boolean) => void;
};

const Reports = ({ setShowModal }: Props) => {
  return (
    // <div className="flex justify-center items-center fixed top-0 right-[50%] translate-y-1/2 translate-x-1/2 w-[50%] h-[50%] bg-black/60 z-10">
    <div className="flex justify-center items-center fixed top-0 right-0 w-screen h-screen bg-black/30 z-10">
      <div className="flex flex-col items-center w-full xs:w-[60%] ss:w-[50%] sm:w-[40%] max-w-[500px] h-auto dark:bg-primary-500 bg-white p-6 gap-2 rounded-lg">
        <button
          className="text-lg font-semibold"
          type="button"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        <div className="w-32 h-w-32">
          <Image src={Logo} alt="Logo" className="rounded-full p-2" />
        </div>
        <h2 className="text-xl font-semibold">¡Alert!</h2>
        <p className="text-lg text-center">
          To perform this action it is necessary to log in
        </p>
        <button
          type="button"
          className={`flex justify-center items-center gap-4 text-lg text-white p-3 w-full hover:bg-blue-600 bg-blue-500 dark:hover:bg-primary-400 dark:bg-primary-800 rounded-lg hover:scale-105 transition-transform`}
          onClick={() => signIn()}
        >
          Reports <GiEntryDoor />
        </button>
      </div>
    </div>
  );
};

export default Reports;
