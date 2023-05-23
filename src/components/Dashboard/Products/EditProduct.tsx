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
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  allBrands,
  allSubcategorias,
  getAllBrands,
  getAllSubcategorias,
  patchOneProduct,
  selectPatchOneProductStatus,
} from "@/state/products/product/productSlice";
import { useAppDispatch } from "@/state/store";
import LoaderModal from "@/components/Loaders/LoaderModal";
import { EStateGeneric } from "@/shared/util/types";
import { getAllProductsDashboard } from "@/state/products/products/productsSlice";
type Props = {
  item: any;
  cancel: (value: any) => void;
  // handleDelete: () => void;
  // type: string;
};

const EditProduct = ({ item, cancel }: Props) => {
  const [image, setImage] = useState(null);
  const [pathImage, setPathImage] = useState<any>(item.image);
  const ref = useRef<any>(null);
  const router = useRouter();
  const brands = useSelector(allBrands);
  const subcategorias = useSelector(allSubcategorias);
  const status = useSelector(selectPatchOneProductStatus);
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
    stock: Yup.number().required("Stock is required"),
    brand: Yup.string().required("Brand is required"),
    subcategory: Yup.string().required("Subcategory is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      stock: item.stock,
      brand: item.brand.id,
      subcategory: item.subcategory.id,
      enable: !item.deleted,
    },
    validationSchema,
    onSubmit,
  });

  async function onSubmit(
    values: {
      id: number;
      name: string;
      price: string;
      description: string;
      stock: string;
      brand: string;
      subcategory: string;
      enable: boolean;
    },
    { resetForm }: { resetForm: any }
  ) {
    try {
      const res = await dispatch(patchOneProduct({ ...values, image }));
      if (res.payload.success) {
        toast.success("Product updated successfully");
        await dispatch(getAllProductsDashboard());
        resetForm();
        setImage(null);
        setPathImage(null);
        cancel(null);
      } else {
        toast.error(res.payload.error);
      }
    } catch (error) {
      toast.error("An error occurred while registering.");
    }
  }
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        await dispatch(getAllBrands());
        await dispatch(getAllSubcategorias());
      }
    })();
  }, []);
  return (
    <div className="flex justify-center sm:items-center fixed top-0 right-0 w-screen h-screen bg-black/50 z-[9999]">
      <div className="overflow-y-auto bg-gray-50 dark:bg-primary-600 p-4 w-full xs:w-[80%] ss:w-[80%] sm:w-[90%]">
        <Header title="NEW PRODUCT" subtitle="add a new product to the list" />
        <form
          // onSubmit={formik.handleSubmit}
          onSubmit={(e) => {
            e.preventDefault();
            if (
              !formik.values.name ||
              !formik.values.price ||
              !formik.values.description ||
              !formik.values.stock ||
              !formik.values.brand ||
              !formik.values.subcategory
            ) {
              return toast.error(
                "Please complete all fields before submitting the form"
              );
            }
            formik.handleSubmit();
          }}
          className="flex flex-wrap gap-4 justify-center items-center mt-4"
        >
          <div className="flex flex-col items-center gap-1 w-full ss:w-[48%] max-w-[500px]">
            <div className="relative w-full max-w-[350px] dark:bg-primary-500 bg-white">
              {/* <Image src={pathImage || Logo} alt="Logo" /> */}
              <Image
                src={pathImage || Logo}
                alt="Logo"
                width={500}
                height={500}
              />
            </div>
            <label className="flex items-center justify-center  px-4 py-2 cursor-pointer rounded-lg bg-indigo-500 text-white">
              <span className="mr-2">Seleccionar archivo</span>
              <input
                ref={ref}
                type="file"
                className="hidden"
                onChange={() => {
                  setImage(ref.current?.files[0]);
                  const reader = new FileReader();
                  const file = ref.current?.files[0];
                  if (file) {
                    reader.readAsDataURL(file);
                    reader.onload = function load() {
                      setPathImage(reader.result);
                    };
                  }
                }}
              />
            </label>
          </div>
          <div className="w-full ss:w-[48%] flex justify-center flex-wrap gap-4">
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
              width="w-full max-w-[500px]"
            />
            <div className="flex justify-center w-full max-w-[500px]">
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
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (formik.errors.description) {
                    return toast.error(formik.errors.description);
                  }
                }}
              />
            </div>
            <div className="flex justify-center w-full max-w-[500px]">
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
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (formik.errors.brand) {
                    return toast.error(formik.errors.brand);
                  }
                }}
              >
                <option value="">Seleccione marca</option>
                {brands.map((e: any, i) => (
                  <option key={i} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="w-[10%] flex items-center justify-center dark:bg-primary-500/50 bg-slate-300 dark:text-white text-black"
              >
                <AiOutlinePlusSquare size={28} />
              </button>
            </div>
            <div className="flex justify-center w-full max-w-[500px]">
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
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (formik.errors.subcategory) {
                    return toast.error(formik.errors.subcategory);
                  }
                }}
              >
                <option value="">Seleccione categoría</option>
                {subcategorias.map((e: any, i) => (
                  <option key={i} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="w-[10%] flex items-center justify-center dark:bg-primary-500/50 bg-slate-300 dark:text-white text-black"
              >
                <AiOutlinePlusSquare size={28} />
              </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center w-full max-w-[500px]">
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
                width="w-[45%] ss:w-1/3 max-w-[250px]"
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
                width="w-[45%] ss:w-1/3 max-w-[250px]"
              />
              <div className="flex justify-center">
                <div className="flex my-auto">
                  <input
                    className="cursor-pointer w-5 h-5 my-auto"
                    type="checkbox"
                    checked={formik.values.enable}
                    {...formik.getFieldProps("enable")}
                  />
                  <label
                    htmlFor="enable"
                    className="block text-sm font-bold ml-2"
                  >
                    Enable
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full gap-4">
            <button
              className="flex items-center justify-center px-6 py-4 cursor-pointer rounded-lg bg-slate-400 dark:bg-primary-500 text-white"
              type="submit"
            >
              Submit
            </button>
            <button
              className="flex items-center justify-center px-6 py-4 cursor-pointer rounded-lg bg-red-500 text-white"
              type="button"
              onClick={() => cancel(null)}
            >
              Cancel
            </button>
          </div>
        </form>
        {status === EStateGeneric.PENDING && <LoaderModal />}
      </div>
    </div>
  );
};

export default EditProduct;
