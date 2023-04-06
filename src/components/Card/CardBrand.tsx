import { IProduct } from "@/shared/util/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: IProduct,
}

const CardBrand = ({ product }: Props) => {
    return (
        <div className="flex flex-col items-center gap-5 p-2 w-[240px] h-[350px] dark:bg-primary-700 bg-slate-50">
            <Link href={`/products/brand?name=${product.brand.name}`} className="relative w-full h-[90%]"><Image src={product.image} alt={product.name} fill></Image></Link>
            <Link href={`/products/brand?name=${product.brand.name}`} className="h-[8%] text-center font-semibold">{product.brand.name}</Link>
        </div>
    )
}

export default CardBrand