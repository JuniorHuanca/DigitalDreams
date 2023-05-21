import Header from "../Header";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import Logo from "@/assets/img/Avatar.png";
import { MdCategory, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import InputField from "./InputField";
import {
  AiOutlinePlusSquare,
  AiFillTags,
  AiOutlineStock,
} from "react-icons/ai";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import Image from "next/image";
type Props = {};

const NewProduct = (props: Props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
    stock: Yup.number().required("Stock is required"),
    brand: Yup.string().required("Brand ID is required"),
    subcategory: Yup.string().required("Subcategory ID is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      stock: "",
      brand: "",
      subcategory: "",
    },
    validationSchema,
    onSubmit,
  });

  async function onSubmit(
    values: {
      name: string;
      price: string;
      description: string;
      stock: string;
      brand: string;
      subcategory: string;
    },
    { resetForm }: { resetForm: any }
  ) {
    try {
    } catch (error) {
      toast.error("An error occurred while registering.", { duration: 3000 });
    }
  }
  return (
    <div>
      <Header title="NEW PRODUCT" subtitle="add a new product to the list" />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-wrap gap-4 justify-center items-center mt-4"
      >
        <InputField
          formik={formik}
          fieldName="name"
          placeholder="NAME"
          icon={
            <MdOutlineDriveFileRenameOutline
              size={28}
              className={`${
                !formik.errors.name && formik.values.name
                  ? "fill-[#6366f1]"
                  : "fill-gray-400"
              }`}
            />
          }
          width="w-full ss:w-[48%] max-w-[500px]"
        />
        <InputField
          formik={formik}
          fieldName="price"
          placeholder="PRICE"
          icon={
            <RiMoneyDollarCircleFill
              size={28}
              className={`${
                !formik.errors.price && formik.values.price
                  ? "fill-[#6366f1]"
                  : "fill-gray-400"
              }`}
            />
          }
          width="w-full ss:w-[48%] max-w-[500px]"
        />
        <InputField
          formik={formik}
          fieldName="stock"
          placeholder="STOCK"
          icon={
            <AiOutlineStock
              size={28}
              className={`${
                !formik.errors.stock && formik.values.stock
                  ? "fill-[#6366f1]"
                  : "fill-gray-400"
              }`}
            />
          }
          width="w-full ss:w-[48%] max-w-[500px]"
        />
        <div className="flex justify-center w-full ss:w-[48%] max-w-[500px]">
          <span
            className={`${
              formik.touched.description && formik.errors.description
                ? "bg-red-500"
                : "dark:bg-primary-500 bg-white"
            } selection:icon flex items-center p-2 rounded-l-sm`}
          >
            <BsFillChatSquareTextFill
              size={28}
              className={`${
                !formik.errors.description && formik.values.description
                  ? "fill-[#6366f1]"
                  : "fill-gray-400"
              }`}
            />
          </span>
          <textarea
            className={`${
              formik.touched.description && formik.errors.description
                ? "border-2 border-red-500 placeholder:text-red-500"
                : ""
            } dark:bg-primary-500 bg-white w-full dark:text-white focus:outline-none p-4 rounded-r-sm`}
            placeholder={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : "description"
            }
            {...formik.getFieldProps("description")}
          />
        </div>

        <div className="flex justify-center w-full ss:w-[48%] max-w-[500px]">
          <span
            className={`${
              formik.touched.brand && formik.errors.brand
                ? "bg-red-500"
                : "dark:bg-primary-500 bg-white"
            } selection:icon flex items-center p-2 rounded-l-sm`}
          >
            <AiFillTags
              size={28}
              className={`${
                !formik.errors.brand && formik.values.brand
                  ? "fill-[#6366f1]"
                  : "fill-gray-400"
              }`}
            />
          </span>
          <select
            className={`${
              formik.touched.brand && formik.errors.brand
                ? "border-2 border-red-500 placeholder:text-red-500"
                : ""
            } dark:bg-primary-500 bg-white w-[90%] dark:text-white focus:outline-none p-4 rounded-r-sm`}
            {...formik.getFieldProps("brand")}
          >
            <option value="">Seleccione marca</option>
            <option value="marca1">Marca 1</option>
            <option value="marca2">Marca 2</option>
            <option value="marca3">Marca 3</option>
          </select>
          <button
            type="button"
            className="w-[10%] flex items-center justify-center dark:bg-primary-500/50 bg-slate-300 dark:text-white text-black"
          >
            <AiOutlinePlusSquare size={28} />
          </button>
        </div>

        <div className="flex justify-center w-full ss:w-[48%] max-w-[500px]">
          <span
            className={`${
              formik.touched.subcategory && formik.errors.subcategory
                ? "bg-red-500"
                : "dark:bg-primary-500 bg-white"
            } selection:icon flex items-center p-2 rounded-l-sm`}
          >
            <MdCategory
              size={28}
              className={`${
                !formik.errors.subcategory && formik.values.subcategory
                  ? "fill-[#6366f1]"
                  : "fill-gray-400"
              }`}
            />
          </span>
          <select
            className={`${
              formik.touched.subcategory && formik.errors.subcategory
                ? "border-2 border-red-500 placeholder:text-red-500"
                : ""
            } dark:bg-primary-500 bg-white w-[90%] dark:text-white focus:outline-none p-4 rounded-r-sm`}
            {...formik.getFieldProps("subcategory")}
          >
            <option value="">Seleccione categoría</option>
            <option value="categoria1">Categoría 1</option>
            <option value="categoria2">Categoría 2</option>
            <option value="categoria3">Categoría 3</option>
            {/* Agrega más opciones según tus necesidades */}
          </select>
          <button
            type="button"
            className="w-[10%] flex items-center justify-center dark:bg-primary-500/50 bg-slate-300 dark:text-white text-black"
          >
            <AiOutlinePlusSquare size={28} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-1 w-full ss:w-[48%] max-w-[500px]">
          <div className="relative w-80 h-80 dark:bg-primary-500 bg-white">
            <Image src={Logo} alt="Logo" />
          </div>
          <label className="flex items-center justify-center  px-4 py-2 cursor-pointer rounded-lg bg-indigo-500 text-white">
            <span className="mr-2">Seleccionar archivo</span>
            <input
              type="file"
              className="hidden"
              {...formik.getFieldProps("file")}
            />
          </label>
        </div>
        <div className="flex justify-center w-full">
          <button
            className="flex items-center justify-center px-6 py-4 cursor-pointer rounded-lg bg-slate-400 dark:bg-primary-500 text-white"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
