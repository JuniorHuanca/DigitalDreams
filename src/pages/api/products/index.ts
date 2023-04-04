import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"
import brandsData from '@/shared/util/data/brands'
import categoriesData from '@/shared/util/data/categories'
import countriesData from '@/shared/util/data/countries'
import productsData from '@/shared/util/data/products'
import subcategoriesData from '@/shared/util/data/subcategories'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { brandsQ, categoriesQ, countriesQ, subcategoriesQ, productsQ, } = req.query
    switch (method) {
        case 'GET':
            try {
                // const brands = await prisma.brand.findMany()
                // const categories = await prisma.category.findMany()
                // const countries = await prisma.country.findMany()
                // const subcategories = await prisma.subcategory.findMany()
                const products = await prisma.product.findMany({
                    take: 10,
                    // orderBy: {
                    //     name: 'desc'
                    // }
                })
                return res.status(200).json({
                    success: true,
                    // brands: brands,
                    // categories: categories,
                    // countries: countries,
                    // subcategories: subcategories,
                    products: products,
                })
            } catch (error) {
                return res.status(400).json({ success: false, error })
            }
        default:
            res.status(400).json({ success: false })
            break
    }
}