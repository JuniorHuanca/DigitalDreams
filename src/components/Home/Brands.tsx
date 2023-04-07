import { allProductsBrands, getAllProductsBrands, selectAllProductsBrandsStatus } from "@/state/products/products/productsSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CardBrand from "../Card/CardBrand"
import { useRouter } from "next/router"
import { EStateGeneric } from "@/shared/util/types"
import Loader from "../Loaders/Loader"
type Props = {}

const Brands = (props: Props) => {
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router = useRouter()
    const brandsStatus = useSelector(selectAllProductsBrandsStatus)
    const brands = useSelector(allProductsBrands)
    const first = brands.slice(0, 6)
    const second = brands.slice(6, brands.length)
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
    return (
        <div className='w-full pb-4'>
            <h2 className='text-xl font-semibold m-4 capitalize '>Discover the Brands that Work with Us</h2>
            {brandsStatus === EStateGeneric.SUCCEEDED &&
                <div className=" flex flex-wrap justify-center gap-4">
                    {first.map((brand, index) => <CardBrand product={brand} key={index} />)}
                    {isOpen && second.map((brand, index) => <CardBrand product={brand} key={index} />)}
                </div>}
            {brandsStatus === EStateGeneric.PENDING && (
                <div className='w-full h-[20vh] flex justify-center items-center'>
                    <Loader />
                </div>
            )}
            <div className="w-full flex justify-center py-4">
                {isOpen && (
                    <button className="w-[10%] dark:border-white border-black border-2  p-2 hover:scale-110 transition-all" onClick={() => setIsOpen(false)}>See Less</button>
                )}
                {!isOpen && second.length > 0 && (
                    <button className="w-[10%] dark:border-white border-black border-2  p-2 hover:scale-110 transition-all" onClick={() => setIsOpen(true)}>See More</button>
                )}
            </div>
        </div>

    )
}

export default Brands