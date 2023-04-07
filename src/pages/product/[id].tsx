import { oneProduct, cleanUpProduct, selectOneProductStatus, getOneProduct } from "@/state/products/product/productSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Card from "../../components/Card/Card"
import { useRouter } from "next/router"
import { EStateGeneric, IProduct, ITheme } from "@/shared/util/types"
import Loader from "../../components/Loaders/Loader"
import Layout from "@/components/Layouts/Layout"
import Link from "next/link"
import Image from "next/image"
import NotFound from '@/assets/404Product.gif'
import NotFoundMobile from '@/assets/404MobileProduct.gif'
import NotFoundDark from '@/assets/404ProductDark.gif'
import NotFoundDarkMobile from '@/assets/404MobileProductDark.gif'
import useMediaQuery from "@/shared/util/useMediaQuery"
import { Rating, useTheme } from "@mui/material"
type Props = {}

const Detail = (props: Props) => {
    const isAboveSmallScreens = useMediaQuery("(min-width: 620px)");
    const theme: ITheme = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { mode } = theme.palette
    const dispatch = useAppDispatch()
    const router = useRouter()
    const productStatus = useSelector(selectOneProductStatus)
    const product = useSelector(oneProduct)

    useEffect(() => {
        (async () => {
            if (router.isReady) {
                const { id } = router.query
                if (productStatus === EStateGeneric.IDLE) {
                    await dispatch(getOneProduct(id as string));
                }
            }
        })()

        return () => {
            // dispatch(cleanUpProduct())
        }
    }, [router.query.id])
    const description = product?.description?.map((ele: Record<string, any>) => {
        const key = Object.keys(ele)[0];
        const value: any = Object.values(ele)[0];
        switch (key) {
            case "ul":
                if (Array.isArray(value)) {
                    return (
                        <ul>
                            {value.map((data: string, index) => {
                                return <li key={index}>{data}</li>;
                            })}
                        </ul>
                    );
                } else {
                    return null;
                }
            case "h2":
                if (value.startsWith("https://")) {
                    return <Link href={value}>{value}</Link>;
                } else {
                    return <h2 className="font-semibold text-base">{value}</h2>;
                }
            default:
                return <br />;
        }
    });
    return (
        <Layout tittle={`${product.name} - Digital Dreams` || 'Error 404 Digital Dreams'}>
            <div className='w-full min-h-[90vh] flex flex-col items-center gap-4'>
                {productStatus === EStateGeneric.PENDING && (
                    <div className='w-full h-[90vh] flex justify-center items-center'>
                        <Loader />
                    </div>
                )}
                {productStatus === EStateGeneric.FAILED && (
                    <div className='relative w-full h-[90vh] flex justify-center items-center'>
                        {mode === 'dark' && <Image src={isAboveSmallScreens ? NotFoundDark : NotFoundDarkMobile} alt='Error' fill priority={true} />}
                        {mode !== 'dark' && <Image src={isAboveSmallScreens ? NotFound : NotFoundMobile} alt='Error' fill priority={true} />}
                    </div>
                )}
                {productStatus === EStateGeneric.SUCCEEDED && product.name && (
                    <div className='w-full sm:min-h-[90vh] flex flex-col sm:flex-row sm:items-start items-center gap-2 py-4 flex-wrap'>
                        <div className='w-full sm:w-[70%] px-2 sm:h-full flex flex-col items-center gap-2'>
                            <Link href={`/products/brand?name=${product.brand.name}`} className='text-3xl font-semibold my-2 md:m-4 uppercase underline underline-offset-8'>{product.brand.name}</Link>
                            <div className='relative w-full sm:w-[450px] h-[250px] xs:h-[350px] md:h-[450px]'>
                                <Image src={product.image} alt={product.name} fill priority={true} />
                            </div>
                        </div>
                        <div className='sm:h-[500px] sm:w-[28%] px-2 flex flex-col items-center sm:justify-center py-4 gap-2'>
                            <div className="border-t-2 dark:border-white border-black w-full"></div>
                            <h2 className='text-lg md:text-xl text-center font-semibold my-2 md:m-4 capitalize '>{product.name}</h2>
                            <p className='flex items-center font-semibold gap-2'>
                                {product.rating}
                                <Rating value={product.rating} precision={0.1} size="large" readOnly />
                            </p>
                            <details className='w-full p-2 overflow-hidden'>
                                <summary onClick={() => setIsOpen(!isOpen)} className="text-center font-semibold text-base md:text-lg">
                                    {isOpen ? 'Hide description' : 'Show description'}
                                </summary>
                                {isOpen && <div className=''>{description}</div>}
                            </details>
                            <p className="font-semibold text-2xl">US $ {product.price}</p>
                            <div className='flex flex-col items-center'>
                                <div>
                                    <button className='mr-4 py-4 px-3 dark:bg-primary-700 hover:dark:bg-primary-800 bg-white hover:bg-slate-300 rounded-sm' type="button">-</button>
                                    {/* {product.quantity} */}
                                    15
                                    <button className='ml-4 py-4 px-3 dark:bg-primary-700 hover:dark:bg-primary-800 bg-white hover:bg-slate-300 rounded-sm' type="button">+</button>
                                </div>
                                <span className="my-2">
                                    Stock disponible: {product.stock}
                                </span>
                            </div>
                            <button
                                type="submit"
                                className='p-4 border-2 dark:border-white border-black hover:dark:bg-primary-800 hover:bg-slate-300'
                            // onClick={handleAddToCart}
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                        <div className="w-full h-[200px] border-2 dark:border-white border-black">
                            <p className="text-center font-semibold text-5xl">Without comments for now</p>
                        </div>
                    </div>

                )}
            </div>
        </Layout>
    )
}

export default Detail