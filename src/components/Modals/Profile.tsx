import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch } from "@/state/store";
import { getOneUser, updateOneUser } from "@/state/users/user/userSlice";
import { toast } from "react-hot-toast";
type Props = {
  user: any;
  setSeletUser: (value: any) => void;
};

const Profile = ({ user, setSeletUser }: Props) => {
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("name is required"),
    // id: Yup.string()
    //     .required('id is required'),
    // image: Yup.string()
    //     .required('image is required'),
    // password: Yup.string()
    //     .required('password is required'),
    // city: Yup.string()
    //     .required('city is required'),
    // state: Yup.string()
    //     .required('state is required'),
    // country: Yup.string()
    //     .required('country is required'),
    // occupation: Yup.string()
    //     .required('occupation is required'),
    // phoneNumber: Yup.string()
    //     .required('phoneNumber is required'),
    // provider: Yup.string()
    //     .required('provider is required'),
    // role: Yup.string()
    //     .required('role is required'),
  });
  const formik = useFormik({
    initialValues: {
      id: user.id,
      username: user.username,
      name: user.name,
      image: user.image,
      password: user.password,
      city: user.city,
      state: user.state,
      country: user.country,
      occupation: user.occupation,
      phoneNumber: user.phoneNumber,
      provider: user.provider,
      role: user.role,
    },
    validationSchema,
    onSubmit,
  });
  async function onSubmit(values: any) {
    try {
      console.log(values)
      const response: any = await dispatch(updateOneUser(values));
      if (response?.error) {
        toast.error("An error occurred", { duration: 3000 });
      }
      if (!response?.error) {
        toast.success("Profile updated successfully", { duration: 3000 });
        await dispatch(getOneUser(user?.email));
        setSeletUser(null);
      }
    } catch (error) {
      toast.error("An error occurred", { duration: 3000 });
    }
  }

  return (
    <div className="absolute w-full h-screen bg-black/50 top-0 left-0 flex justify-center items-center z-30">
      <form
        className="flex flex-col gap-4 w-full sm:w-[50%] bg-white dark:bg-primary-500 rounded-md p-6"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="flex  gap-4 text-2xl font-bold">Update profile</h2>
        {user?.provider === "local" && (
          <div className="flex flex-col justify-center w-full items-center">
            <label className="text-base font-bold">username</label>
            <input
              className={`dark:bg-primary-400 bg-slate-200 w-full sm:w-3/4 focus:outline-none dark:text-white p-4 rounded-md`}
              {...formik.getFieldProps("username")}
              type="text"
            />
          </div>
        )}
        <div className="flex flex-col justify-center w-full items-center">
          <label className="text-base font-bold">name</label>
          <input
            className={`dark:bg-primary-400 bg-slate-200 w-full sm:w-3/4 focus:outline-none dark:text-white p-4 rounded-md`}
            {...formik.getFieldProps("name")}
            type="text"
          />
        </div>
        {/* <div className="flex flex-col justify-center w-full items-center">
                    <label className="text-base font-bold">image</label>
                    <input className={`dark:bg-primary-400 bg-slate-200 w-full sm:w-3/4 focus:outline-none dark:text-white p-4 rounded-md`}
                        {...formik.getFieldProps('image')}
                        type="text" />
                </div> */}
        <div className="flex justify-evenly">
          <button
            className="py-2 px-4 bg-indigo-700 text-white rounded-lg"
            type="submit"
          >
            Update
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-red-500 text-white rounded-lg"
            onClick={() => setSeletUser(null)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
