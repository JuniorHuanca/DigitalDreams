type Props = {
  formik: any;
};

const InputField = ({ formik }: Props) => {
  return (
    <div className="flex justify-center w-full ">
      <span
        className={`${
          formik.touched.name && formik.errors.name
            ? "bg-red-400"
            : "bg-gray-400/30"
        } selection:icon flex items-center p-2 rounded-l-sm`}
      >
        {/* <HiUser
        size={28}
        className={`${
          !formik.errors.name && formik.values.name
            ? "fill-[#6366f1]"
            : "fill-gray-800/30"
        }`}
      /> */}
      </span>
      <input
        className={`${
          formik.touched.name && formik.errors.name
            ? "border-2 border-red-400 placeholder:text-red-400"
            : ""
        } bg-gray-400/30 w-3/4 md:w-2/4  focus:outline-none text-gray-800 p-4 rounded-r-sm`}
        placeholder={
          formik.touched.name && formik.errors.name
            ? formik.errors.name
            : "Username"
        }
        {...formik.getFieldProps("name")}
        type="text"
      />
    </div>
  );
};

export default InputField;
