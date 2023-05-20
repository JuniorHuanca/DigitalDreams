import Header from "../Header";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
type Props = {};

const NewProduct = (props: Props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
    stock: Yup.number().required("Stock is required"),
    soldCount: Yup.number().required("Sold count is required"),
    brand_id: Yup.string().required("Brand ID is required"),
    subcategory_id: Yup.string().required("Subcategory ID is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      stock: "",
      soldCount: "",
      brand_id: "",
      subcategory_id: "",
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
      soldCount: string;
      brand_id: string;
      subcategory_id: string;
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
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-center w-full ">
          <span
            className={`${
              formik.touched.name && formik.errors.name
                ? "bg-red-400"
                : "bg-gray-400/30"
            } selection:icon flex items-center p-2 rounded-l-sm`}
          >
            <MdOutlineDriveFileRenameOutline
              size={28}
              className={`${
                !formik.errors.name && formik.values.name
                  ? "fill-[#6366f1]"
                  : "fill-white"
              }`}
            />
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
                : "name"
            }
            {...formik.getFieldProps("name")}
            type="text"
          />
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
