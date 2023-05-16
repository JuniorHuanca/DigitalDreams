import { IProduct } from "@/shared/util/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: IProduct;
};

const CardRelated = ({ product }: Props) => {
  return (
    <div className="flex flex-col items-center p-2 max-w-[270px] min-w-[270px] xs:max-w-[240px] xs:min-w-[240px] h-[350px] bg-gradient-to-b rounded-xl dark:from-primary-500 dark:to-primary-700 from-slate-50 to-white hover:scale-95 hover:shadow-xl hover:shadow-slate-400 dark:shadow-indigo-500 transition-all">
      <Link
        href={`/product/${product.id}`}
        className="w-full relative h-[57%] rounded-xl overflow-hidden"
      >
        <Image src={product.image} alt={product.name} fill loading="lazy" />
      </Link>
      <Link
        href={`/product/${product.id}`}
        className="w-full h-[27%] text-center mt-5"
      >
        {product.name}
      </Link>
      <Link
        href={`/products/brand?name=${product.brand.name}`}
        className="w-full h-[8%] text-center font-semibold"
      >
        {product.brand.name}
      </Link>
      <Link
        href={`/product/${product.id}`}
        className="w-full h-[8%] text-center font-semibold text-lg"
      >
        US $ {product.price}
      </Link>
    </div>
  );
};

export default CardRelated;
