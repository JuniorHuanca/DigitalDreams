import { allProductsBrand, cleanUpProductsBrand, getAllProductsBrand, selectAllProductsBrandStatus } from "@/state/products/products/productsSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Card from "../../components/Card/Card"
import { useRouter } from "next/router"
import { EStateGeneric } from "@/shared/util/types"
import Loader from "../../components/Loaders/Loader"
import Layout from "@/components/Layouts/Layout"

type Props = {}

const Products = (props: Props) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const productsStatus = useSelector(selectAllProductsBrandStatus)
    const products = useSelector(allProductsBrand)

    useEffect(() => {
        (async () => {
            if (router.isReady) {
                const { name } = router.query
                if (productsStatus === EStateGeneric.IDLE) {
                    await dispatch(getAllProductsBrand(name as string));
                }
            }
        })()

        return () => {
            dispatch(cleanUpProductsBrand())
        }
    }, [router.query.name])
    return (
        <Layout>
            <div className='w-full min-h-[90vh] flex flex-wrap justify-center gap-4'>
                {products.length ? products.map((e, index) => <Card key={index} product={e} />) :
                    <div className='w-full h-[90vh] flex justify-center items-center'>
                        <Loader />
                    </div>
                }
            </div>
        </Layout>
    )
}

export default Products