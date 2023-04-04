import { getAllProducts } from "@/state/products/products/productsSlice"
import { RootState, useAppDispatch } from "@/state/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Card from "../Card/Card"

type Props = {}

const Products = (props: Props) => {
    const dispatch = useAppDispatch()
    const products = useSelector((store: RootState )=> store.products.products)
    useEffect(() => {
        dispatch(getAllProducts())
        //   return () => {
        //     second
        //   }
    }, [])

    return (
        <div className='w-full min-h-[90vh] flex flex-wrap justify-center gap-4'>
            {products.map((e, index) => <Card key={index} product={e}/>)}
        </div>
    )
}

export default Products