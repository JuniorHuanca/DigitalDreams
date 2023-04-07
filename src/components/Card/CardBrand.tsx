import { IProduct } from "@/shared/util/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: IProduct,
}

const CardBrand = ({ product }: Props) => {
    return (
        <div className="flex items-center gap-5 p-2 w-[400px] h-[240px] dark:bg-primary-700 bg-slate-5">
            <Link href={`/products/brand?name=${product.brand.name}`} className="relative w-full h-full">
                <Image src={product.image} alt={product.name} fill />
                <p className="text-white text-shadow font-bold text-[250%] absolute bottom-0 right-0 p-2">{product.brand.name}</p>
            </Link>
        </div>
    )
}

export default CardBrand