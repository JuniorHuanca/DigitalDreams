type Props = {
    user: any;
    setSeletUser: (value: any) => void;
}

const Profile = ({ user, setSeletUser }: Props) => {
    return (
        <div className="absolute w-screen h-screen bg-black/50 top-0 left-0 flex justify-center items-center">
            <form className="flex flex-col gap-4 w-[50%] bg-primary-500 rounded-md p-6">
                <h2 className="flex  gap-4 text-2xl font-bold">Update profile</h2>
                <div className="flex justify-center w-full ">
                    <input className={`bg-primary-400 w-3/4 md:w-2/4  focus:outline-none text-white p-4 rounded-md`}
                        value={user?.name}
                        type="text" />
                </div>
                <div className="flex justify-center w-full ">
                    <input className={`bg-primary-400 w-3/4 md:w-2/4  focus:outline-none text-white p-4 rounded-md`}
                        value={user?.name}
                        type="text" />
                </div>
                <div className="flex justify-center w-full ">
                    <input className={`bg-primary-400 w-3/4 md:w-2/4  focus:outline-none text-white p-4 rounded-md`}
                        value={user?.name}
                        type="text" />
                </div>
                <div className="flex justify-evenly">
                    <button className="py-2 px-4 bg-white dark:bg-primary-600 rounded-lg">Update</button>
                    <button className="py-2 px-4 bg-white dark:bg-primary-600 rounded-lg" onClick={() => setSeletUser(null)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default Profile