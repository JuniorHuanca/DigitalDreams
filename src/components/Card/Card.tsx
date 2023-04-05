import { IProduct } from "@/shared/util/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: IProduct,
}

const Card = ({ product }: Props) => {
    return (
        <div className="flex flex-col items-center gap-5 p-2 w-[240px] h-[350px] dark:bg-primary-700 bg-slate-50">
            <Link href={`/product/${product.id}`} className="relative w-full h-[69%]"><Image src={product.image} alt={product.name} fill></Image></Link>
            <Link href={`/products/brand?name=${product.brand.name}`} className="h-[8%] text-center font-semibold">{product.brand.name}</Link>
            <p className="h-[15%] text-center">{product.name}</p>
            <p className="h-[8%] text-center font-semibold text-lg">US $ {product.price}</p>
        </div>
    )
}

export default Card