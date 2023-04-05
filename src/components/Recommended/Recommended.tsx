import { allProductsRecommended, cleanUpProductsRecommended, getAllProductsRecommended, selectAllProductsRecommendedStatus } from "@/state/products/products/productsSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Card from "../Card/Card"
import { useRouter } from "next/router"
import { EStateGeneric } from "@/shared/util/types"
import Loader from "../Loaders/Loader"
import { Navigation, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
type Props = {}

const Recommended = (props: Props) => {
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
        <div className='w-screen min-h-[90vh]'>
            <Swiper
                modules={[Navigation, EffectFade]}
                navigation
                effect='cube'
                speed={800}
                slidesPerView={5}
                loop
                spaceBetween={50}
            >
                {products.length ? products.map((product, index) => (
                    <SwiperSlide key={index} ><Card product={product} /></SwiperSlide>
                )) :
                    <div className='w-screen'>
                        <Loader />
                    </div>}
            </Swiper>
            {/* {products.length ? products.map((e, index) => <Card key={index} product={e} />) :
                <div className='w-full h-[90vh] flex justify-center items-center'>
                    <Loader />
                </div>
            } */}
        </div>
    )
}

export default Recommended