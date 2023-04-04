import Image from "next/image";

type Props = {
    product: {
        id: number;
        name: string;
        image: string;
        brand_id: number;
        subcategory_id: number;
        price: number;
        description: string;
        rating: number;
        stock: number;
        soldCount: number;
        createdAt: Date;
        updatedAt: Date;
    }
}

const Card = ({ product }: Props) => {
    return (
        <div className="flex flex-col items-center w-[220px] bg-primary-700">

            <div className="relative w-[90%] h-32"><Image src={product.image} alt={product.name} fill></Image></div>
            <h2>{product.name}</h2>
        </div>
    )
}

export default Card