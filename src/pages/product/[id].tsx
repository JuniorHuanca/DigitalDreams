import { oneProduct, cleanUpProduct, selectOneProductStatus, getOneProduct, postOneReview, selectPostReviewStatus } from "@/state/products/product/productSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Card from "../../components/Card/Card"
import { useRouter } from "next/router"
import { EStateGeneric, ITheme } from "@/shared/util/types"
import Loader from "../../components/Loaders/Loader"
import Layout from "@/components/Layouts/Layout"
import Link from "next/link"
import Image from "next/image"
import NotFound from '@/assets/404Product.gif'
import NotFoundMobile from '@/assets/404MobileProduct.gif'
import NotFoundDark from '@/assets/404ProductDark.gif'
import NotFoundDarkMobile from '@/assets/404MobileProductDark.gif'
import useMediaQuery from "@/shared/util/useMediaQuery"
import { Box, Rating, useTheme } from "@mui/material"
import Related from "@/components/Products/Related"
import CardReview from "@/components/Card/CardReview"
import { useSession } from "next-auth/react"
import Avatar from "react-avatar"
import { toast } from "react-hot-toast"
type Props = {}
interface ISession {
    data: any;
    status: string;
}
const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Poor',
    1.5: 'Below average',
    2: 'Average',
    2.5: 'Above average',
    3: 'Good',
    3.5: 'Very good',
    4: 'Excellent',
    4.5: 'Outstanding',
    5: 'Exceptional'
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const Detail = (props: Props) => {
    const isAboveSmallScreens = useMediaQuery("(min-width: 620px)");
    const [currentProductId, setCurrentProductId] = useState<string>('');
    const [value, setValue] = useState<number>(0);
    const [hover, setHover] = useState(-1);
    const theme: ITheme = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [errorImage, setErrorImage] = useState<boolean>(false);
    const { mode } = theme.palette
    const dispatch = useAppDispatch()
    const router = useRouter()
    const productStatus = useSelector(selectOneProductStatus)
    const product: any = useSelector(oneProduct)
    const { data: session, status }: ISession = useSession()
    const [reviewFields, setReviewFields] = useState({
        product_id: product.id,
        user_id: session?.user?.id,
        description: '',
        rating: value,
    });
    const [reviewsPerProduct, setReviewsPerProduct] = useState<number>(3)
    const maxReviews = product?.reviews?.length;
    const reviews = product?.reviews?.slice(0, reviewsPerProduct)
    useEffect(() => {
        (async () => {
            if (router.isReady) {
                const { id } = router.query;
                // if (productStatus === EStateGeneric.IDLE) {
                if (currentProductId !== id) {
                    setCurrentProductId(id as string);
                    await dispatch(getOneProduct(id as string));
                }
                // }
            }
        })();
        if (session) {
            setReviewFields({
                ...reviewFields,
                user_id: session.user.id,
                product_id: product.id,

            })
        }
        return () => {
            if (currentProductId === router.query.id) {
                dispatch(cleanUpProduct());
            }
        };
    }, [router.query.id, status]);
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
                    return <p className="italic text-base">{value}</p>;
                }
            default:
                return <br />;
        }
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const response = await dispatch(postOneReview(reviewFields))
        if (response.payload.success) {
            toast.success('Review created successfully', { duration: 5000 })
            const { id } = router.query;
            setValue(0)
            setReviewFields({
                ...reviewFields,
                description: '',
                rating: 0,
            })
            await dispatch(getOneProduct(id as string));
        } else {
            toast.error('Error creating review', { duration: 5000 })
        }
    }
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
                    <div className='w-full sm:min-h-[80vh] flex flex-col sm:flex-row sm:items-start gap-4 py-4 sm:py-4 flex-wrap'>
                        <div className='flex flex-col w-full sm:w-auto px-2 sm:px-8'>
                            <Link href={`/products/brand?name=${product.brand.name}`} className='text-3xl text-center sm:text-left font-semibold my-6 md:m-4 uppercase underline underline-offset-8'>{product.brand.name}</Link>
                            <div className='relative w-full sm:w-[500px] h-[250px] xs:h-[350px] md:h-[450px]'>
                                <Image src={product.image} alt={product.name} fill priority={true} />
                            </div>
                        </div>
                        <div className='flex flex-1 flex-col py-6 gap-2 h-auto px-4 sm:px-8'>
                            <h2 className='text-lg md:text-xl font-semibold capitalize '>{product.name}</h2>
                            <p className='flex font-semibold gap-2 items-center'>
                                <Rating value={product.rating} precision={0.1} size="large" readOnly />
                                {product.rating ? product.rating : 'no reviews'}
                            </p>
                            <details className='w-full overflow-hidden' open>
                                <summary onClick={() => setIsOpen(!isOpen)} className="text-base">
                                    {isOpen ? 'Hide description' : 'Show description'}
                                </summary>
                                {isOpen && <div className='h-[210px] overflow-auto description'>{description}</div>}
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
                        <Related name={product.subcategory.name} id={product.id} />
                        <div className="px-4 sm:px-8 w-full">
                            <div className="w-full border-2 dark:border-white border-black">
                                <div className='w-full border-b-2 dark:border-white border-black py-2'><p className="text-center text-xl">User Reviews</p></div>
                                <div className='flex flex-wrap'>
                                    <div className='w-full flex flex-col sm:w-[50%] gap-2 p-2'>
                                        {reviews.length ? reviews.map((e: any, index: any) => <CardReview review={e} key={index} />) :
                                            <div className='w-full sm:w-[50%] mt-12 gap-2'>
                                                <p className='my-auto text-center text-lg font-semibold animate-bounce'>Hi there! Be the first to leave a review about our product! Your opinion is very valuable to us. Don&apos;t hesitate to share your experience and thoughts. Thank you!</p>
                                            </div>}
                                        <div className="flex p-2 justify-evenly">
                                            {reviewsPerProduct < maxReviews && <button className="p-2 border-2 border-black dark:border-white hover:scale-105 transition-all" onClick={() => setReviewsPerProduct(reviewsPerProduct + 3)}>See more</button>}
                                            {reviewsPerProduct > 3 && <button className="p-2 border-2 border-black dark:border-white hover:scale-105 transition-all" onClick={() => setReviewsPerProduct(reviewsPerProduct - 3)}>See less</button>}
                                        </div>
                                    </div>

                                    <div className='w-full flex flex-col sm:w-[50%] gap-2 border-t-2 sm:border-0 border-black dark:border-white p-2'>
                                        <div className="flex items-center gap-2 py-3">
                                            <div className="relative h-12 w-12  overflow-hidden">
                                                {session && (
                                                    session.user.image && !errorImage ? (
                                                        <Image
                                                            className="rounded-full"
                                                            src={session.user.image}
                                                            alt={session.user.name}
                                                            fill
                                                            onError={() => setErrorImage(true)}
                                                        />
                                                    ) : (
                                                        <Avatar name={session.user.name} size="100%" round={true} />
                                                    )
                                                )}
                                                {!session && (
                                                    <div className="rounded-full w-12 h-12 bg-slate-400"></div>
                                                )}
                                            </div>
                                            {session ? session.user.name : 'DigitalDreams'}
                                        </div>
                                        <form className=' flex flex-col gap-2' onSubmit={(e) => handleSubmit(e)}>
                                            <label htmlFor="">Rating </label>
                                            <div className='flex gap-2 font-semibold items-center'>
                                                <Rating
                                                    value={value}
                                                    precision={0.5}
                                                    getLabelText={getLabelText}
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue as number);
                                                        setReviewFields({
                                                            ...reviewFields,
                                                            rating: newValue as number,
                                                            product_id: product.id,
                                                        })
                                                    }}
                                                    onChangeActive={(event, newHover) => {
                                                        setHover(newHover);
                                                    }}
                                                    size="large"
                                                />
                                                {value !== null && (
                                                    <div>{labels[hover !== -1 ? hover : value]}</div>
                                                )}
                                            </div>
                                            <textarea className="min-h-[125px] h-[125px] bg-white dark:bg-primary-500 rounded-lg focus:outline-none p-4" placeholder="Write your opinion about the product here. Include your comments on its quality, functionality, ease of use, value, and anything else you think is important. Your feedback is valuable to us and to other users, so don't hold back!" onBlur={(e) => setReviewFields({
                                                ...reviewFields,
                                                description: e.target.value
                                            })}></textarea>
                                            <button
                                                type="submit"
                                                className='w-40 p-4 border-2 dark:border-white border-black hover:dark:bg-primary-800 hover:bg-slate-300'
                                            >
                                                SUBMIT
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </Layout>
    )
}

export default Detail