import Link from "next/link";

type Props = {
  cancel: (value: any) => void;
  customFuntion: () => void;
  title: string;
  text: string;
};

const Confirmation = ({ cancel, text, title, customFuntion }: Props) => {
  return (
    <div className="flex justify-center items-center fixed top-0 right-0 w-screen h-screen bg-black/30 z-10">
      <div className="w-full xs:w-[60%] ss:w-[50%] sm:w-[40%] max-w-[500px] h-auto dark:bg-primary-500 bg-white p-6 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p>{text}</p>
          <div className="w-full flex justify-evenly">
            <button
              className="p-3 rounded-lg bg-red-500 text-white"
              type="button"
              onClick={customFuntion}
            >
              Delete
            </button>
            <button
              className="p-3 rounded-lg bg-indigo-500 text-white"
              type="button"
              onClick={() => cancel(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
