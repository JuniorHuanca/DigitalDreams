import { toast } from "react-hot-toast";

type Props = {
  formik: any;
  fieldName: string;
  placeholder: string;
  width: string;
  icon: React.ReactNode;
};

const InputField = ({
  formik,
  fieldName,
  placeholder,
  icon,
  width = "w-full",
}: Props) => {
  return (
    <div className={`flex justify-center ${width}`}>
      <span
        className={`${
          formik.touched[fieldName] && formik.errors[fieldName]
            ? "bg-red-500"
            : "dark:bg-primary-500 bg-white"
        } selection:icon flex items-center p-2 rounded-l-sm`}
      >
        {icon}
      </span>
      <input
        {...formik.getFieldProps(fieldName)}
        className={`${
          formik.touched[fieldName] && formik.errors[fieldName]
            ? "border-2 border-red-500 placeholder:text-red-500"
            : ""
        } dark:bg-primary-500 bg-white w-full dark:text-white focus:outline-none p-4 rounded-r-sm`}
        placeholder={
          formik.touched[fieldName] && formik.errors[fieldName]
            ? formik.errors[fieldName]
            : placeholder
        }
        onBlur={(e) => {
          formik.handleBlur(e);
          if (formik.errors[fieldName]) {
            return toast.error(formik.errors[fieldName]);
          }
        }}
        type="text"
      />
    </div>
  );
};

export default InputField;
