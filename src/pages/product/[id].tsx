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
    const [isOpen, setIsOpen] = useState<boolean>(true)
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
                    return <h2 className="italic font-semibold text-base">{value}</h2>;
                }
            default:
                return <br />;
        }
    });
    return (
        <Layout tittle={`${product.name} - Digital Dreams` || 'Error 404 Digital Dreams'}>
            <div className='w-full min-h-[80vh] flex flex-col items-center gap-4'>
                {productStatus === EStateGeneric.PENDING && (
                    <div className='w-full h-[80vh] flex justify-center items-center'>
                        <Loader />
                    </div>
                )}
                {productStatus === EStateGeneric.FAILED && (
                    <div className='relative w-full h-[80vh] flex justify-center items-center'>
                        {mode === 'dark' && <Image src={isAboveSmallScreens ? NotFoundDark : NotFoundDarkMobile} alt='Error' fill priority={true} />}
                        {mode !== 'dark' && <Image src={isAboveSmallScreens ? NotFound : NotFoundMobile} alt='Error' fill priority={true} />}
                    </div>
                )}
                {productStatus === EStateGeneric.SUCCEEDED && product.name && (
                    <div className='w-full sm:min-h-[80vh] flex flex-col sm:flex-row sm:items-start items-center gap-4 px-8 py-4 flex-wrap'>
                        <div className='flex flex-col'>
                            <Link href={`/products/brand?name=${product.brand.name}`} className='text-3xl font-semibold my-2 md:m-4 uppercase underline underline-offset-8'>{product.brand.name}</Link>
                            <div className='relative w-full sm:w-[450px] h-[250px] xs:h-[350px] md:h-[450px]'>
                                <Image src={product.image} alt={product.name} fill priority={true} />
                            </div>
                        </div>
                        <div className='flex flex-1 flex-col p-4 gap-2 h-auto'>
                            {/* <div className="border-t-2 dark:border-white border-black w-full"></div> */}
                            <h2 className='text-lg md:text-xl font-semibold capitalize '>{product.name}</h2>
                            <p className='flex font-semibold gap-2 items-center'>
                                <Rating value={product.rating} precision={0.1} size="large" readOnly />
                                {product.rating}
                            </p>
                            <details className='w-full overflow-hidden' open>
                                <summary onClick={() => setIsOpen(!isOpen)} className="text-base">
                                    {isOpen ? 'Hide description' : 'Show description'}
                                </summary>
                                {isOpen && <div className=''>{description}</div>}
                            </details>
                            <div className='flex flex-col'>
                                <p className="font-semibold text-2xl">US $ {product.price}</p>
                                <div>
                                    <button className='mr-4 py-4 px-3 dark:bg-primary-700 hover:dark:bg-primary-800 bg-white hover:bg-slate-300 rounded-sm' type="button">-</button>
                                    {/* {product.quantity} */}
                                    15
                                    <button className='ml-4 py-4 px-3 dark:bg-primary-700 hover:dark:bg-primary-800 bg-white hover:bg-slate-300 rounded-sm' type="button">+</button>
                                </div>
                                <span className="my-2">
                                    Stock disponible: {product.stock}
                                </span>
                                <button
                                    type="submit"
                                    className='w-40 p-4 border-2 dark:border-white border-black hover:dark:bg-primary-800 hover:bg-slate-300'
                                >
                                    ADD TO CART
                                </button>
                            </div>
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