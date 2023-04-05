import { allProductsRecommended, cleanUpProductsRecommended, getAllProductsRecommended, selectAllProductsRecommendedStatus } from "@/state/products/products/productsSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Card from "../Card/Card"
import { useRouter } from "next/router"
import { EStateGeneric } from "@/shared/util/types"
import Loader from "../Loaders/Loader"

type Props = {}

const Products = (props: Props) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const productsStatus = useSelector(selectAllProductsRecommendedStatus)
    const products = useSelector(allProductsRecommended)
    useEffect(() => {
        (async () => {
            if (router.isReady) {
                if (productsStatus === EStateGeneric.IDLE) {
                    await dispatch(getAllProductsRecommended());
                }
            }
        })()
        return () => {
            dispatch(cleanUpProductsRecommended())
        }
    }, [])
    return (
        <div className='w-full min-h-[90vh] flex flex-wrap justify-center gap-4'>
            {products.length ? products.map((e, index) => <Card key={index} product={e} />) :
                <div className='w-full h-[90vh] flex justify-center items-center'>
                    <Loader />
                </div>
            }
        </div>
    )
}

export default Products