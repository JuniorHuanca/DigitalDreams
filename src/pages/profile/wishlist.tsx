import Layout from "@/components/Layouts/Layout"
import LayoutProfile from "@/components/Layouts/LayoutProfile"
import Head from "next/head"
type Props = {}

const Wishlist = (props: Props) => {
    return (
        <Layout title={'Wishlist'}>
            <div>
                <LayoutProfile>
                    <div className="w-full h-full">
                        <div className="flex flex-col items-center h-full">
                            <div className="flex flex-col w-full  h-full p-8 bg-slate-100 dark:bg-primary-500 rounded-lg">
                                <h1 className="text-xl sm:text-4xl font-bold mb-4">My Wishlist</h1>
                            </div>
                        </div>
                    </div>
                </LayoutProfile>
            </div>
        </Layout>
    )
}

export default Wishlist