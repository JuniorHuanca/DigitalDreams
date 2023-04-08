import { IProduct } from "@/shared/util/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: IProduct,
}

const Card = ({ product }: Props) => {
    return (
        <div className="flex flex-col items-center gap-5 p-2 max-w-[270px] min-w-[270px] xs:max-w-[240px] xs:min-w-[240px] h-[350px] bg-gradient-to-b rounded-xl dark:from-primary-500 dark:to-primary-700 from-slate-50 to-white hover:scale-95 hover:shadow-xl hover:shadow-slate-400 dark:shadow-indigo-500 transition-all">
            <Link href={`/product/${product.id}`} className="relative w-full h-[69%]  rounded-xl overflow-hidden"><Image src={product.image} alt={product.name} fill priority={true} /></Link>
            <p className="h-[15%] text-center">{product.name}</p>
            <Link href={`/products/brand?name=${product.brand.name}`} className="h-[8%] text-center font-semibold">{product.brand.name}</Link>
            <p className="h-[8%] text-center font-semibold text-lg">US $ {product.price}</p>
        </div>
    )
}

export default Card