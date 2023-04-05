import { oneProduct, cleanUpProduct, selectOneProductStatus, getOneProduct } from "@/state/products/product/productSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect } from "react"
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
import { useTheme } from "@mui/material"
type Props = {}

const Detail = (props: Props) => {
    const theme: ITheme = useTheme();
    const { mode } = theme.palette
    const isAboveMediumScreens = useMediaQuery("(min-width: 620px)");
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
            dispatch(cleanUpProduct())
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
                    return <h2>{value}</h2>;
                }
            default:
                return <br />;
        }
    });

    return (
        <Layout tittle={product.name || 'Error 404 Digital Dreams'}>
            <div className='w-full min-h-[90vh] flex flex-col items-center gap-4'>
                {productStatus === EStateGeneric.PENDING && (
                    <div className='w-full h-[90vh] flex justify-center items-center'>
                        <Loader />
                    </div>
                )}
                {productStatus === EStateGeneric.FAILED && (
                    <div className='relative w-full h-[90vh] flex justify-center items-center'>
                        {mode === 'dark' && <Image src={isAboveMediumScreens ? NotFoundDark : NotFoundDarkMobile} alt='Error' fill />}
                        {mode !== 'dark' && <Image src={isAboveMediumScreens ? NotFound : NotFoundMobile} alt='Error' fill />}
                    </div>
                )}
                {productStatus === EStateGeneric.SUCCEEDED && product.name && (
                    <div>
                        <div className='relative w-24 h-24'>
                            <Image src={product.image} alt={product.name} fill />
                        </div>
                        <div>{description}</div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Detail