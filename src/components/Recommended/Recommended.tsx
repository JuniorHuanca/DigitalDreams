import { allProductsRecommended, cleanUpProductsRecommended, getAllProductsRecommended, selectAllProductsRecommendedStatus } from "@/state/products/products/productsSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Card from "../Card/Card"
import { useRouter } from "next/router"
import { EStateGeneric } from "@/shared/util/types"
import Loader from "../Loaders/Loader"
import { Navigation, Autoplay } from 'swiper';
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
        <div className='w-screen min-h-[90vh] flex justify-center'>
            <Swiper
                modules={[Autoplay, Navigation]}
                // style={{
                //     "--swiper-navigation-color": "#000",
                //   }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation
                speed={800}
                slidesPerView={5}
                loop
                spaceBetween={50}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index} ><Card product={product} /></SwiperSlide>
                ))}
            </Swiper>
            {products.length ? null :
                <div className='w-screen'>
                    <Loader />
                </div>}
        </div>
    )
}

export default Recommended