import { allProductsRelateds, cleanUpProductsRelated, getAllProductsRelated, selectAllProductsRelatedsStatus } from "@/state/products/products/productsSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Card from "../Card/Card"
import { useRouter } from "next/router"
import { EStateGeneric } from "@/shared/util/types"
import Loader from "../Loaders/Loader"
import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMediaQuery from "@/shared/util/useMediaQuery"
type Props = {
  name: string
}
interface SwiperStyle extends React.CSSProperties {
  "--swiper-navigation-color"?: string;
}

const Related = ({ name }: Props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const productsStatus = useSelector(selectAllProductsRelatedsStatus)
  const products = useSelector(allProductsRelateds)
  const isAboveMobileScreens = useMediaQuery("(min-width: 480px)");
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const isAboveLargeScreens = useMediaQuery("(min-width: 1060px)");
  const isAboveXtraLargeScreens = useMediaQuery("(min-width: 1200px)");
  const isAboveDobleXtraLargeScreens = useMediaQuery("(min-width: 1700px)");
  function getSlidesPerView(isAboveMobileScreens: boolean, isAboveMediumScreens: boolean, isAboveLargeScreens: boolean, isAboveXtraLargeScreens: boolean): number {
    if (isAboveDobleXtraLargeScreens) {
      return 6;
    } else if (isAboveXtraLargeScreens) {
      return 5;
    } else if (isAboveLargeScreens) {
      return 4;
    } else if (isAboveMediumScreens) {
      return 3;
    } else if (isAboveMobileScreens) {
      return 2;
    } else {
      return 1;
    }
  }
  const slidesPerView = getSlidesPerView(isAboveMobileScreens, isAboveMediumScreens, isAboveLargeScreens, isAboveXtraLargeScreens);
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        if (productsStatus === EStateGeneric.IDLE) {
          await dispatch(getAllProductsRelated(name));
        }
      }
    })()
    return () => {
      dispatch(cleanUpProductsRelated())
    }
  }, [router.isReady])
  return (
    <div className={`w-[94vw] ${products.length ? '' : 'h-[50vh]'} mb-4`}>
      {productsStatus === EStateGeneric.SUCCEEDED && <div className='w-full'>
        <h2 className='text-xl font-semibold m-4 capitalize '>More top-rated products for you to browse</h2>
        <Swiper
          modules={[Autoplay, Navigation]}
          style={{
            "--swiper-navigation-color": "#000",
          } as SwiperStyle}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation
          speed={800}
          slidesPerView={slidesPerView}
          slidesPerGroup={slidesPerView}
          loop
          spaceBetween={50}
          centeredSlides={true}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} ><div className='flex justify-center w-full'><Card product={product} /></div></SwiperSlide>
          ))}
        </Swiper>
      </div>}
      {productsStatus === EStateGeneric.PENDING && <div className='w-full h-[100%] flex justify-center'>
        <Loader />
      </div>}
    </div>
  )
}

export default Related