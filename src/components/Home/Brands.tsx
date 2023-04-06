import { allProductsBrands, getAllProductsBrands, selectAllProductsBrandsStatus } from "@/state/products/products/productsSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Card from "../Card/Card"
import { useRouter } from "next/router"
import { EStateGeneric } from "@/shared/util/types"
import Loader from "../Loaders/Loader"
type Props = {}

const Brands = (props: Props) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const brandsStatus = useSelector(selectAllProductsBrandsStatus)
    const brands = useSelector(allProductsBrands)
    useEffect(() => {
        (async () => {
            if (router.isReady) {
                if (brandsStatus === EStateGeneric.IDLE) {
                    await dispatch(getAllProductsBrands());
                }
            }
        })()
        return () => {
            // dispatch(cleanUpProductsRecommended())
        }
    }, [router.isReady])
    console.log(brands)
    return (
        <div className='w-full min-h-[90vh]'>
            <h2 className='text-xl font-semibold ml-2'>All Brands</h2>
            {brands.length ?
                <div className=" flex flex-wrap justify-center gap-4">
                    {brands.map((brand, index) => <Card product={brand} key={index} />)}
                </div>
                :
                <Loader />}
        </div>

    )
}

export default Brands