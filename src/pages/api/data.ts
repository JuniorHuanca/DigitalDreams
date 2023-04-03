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
                if (brandsQ) {
                    const brands = await prisma.brand.findMany()
                    return res.status(200).json(brands)
                }
                if (categoriesQ) {
                    const categories = await prisma.category.findMany()
                    return res.status(200).json(categories)
                }
                if (countriesQ) {
                    const countries = await prisma.country.findMany()
                    return res.status(200).json(countries)
                }
                if (subcategoriesQ) {
                    const subcategories = await prisma.subcategory.findMany()
                    return res.status(200).json(subcategories)
                }
                if (productsQ) {
                    const products = await prisma.product.findMany({
                        include: {
                            brand: true,
                            subcategory: {
                                include: {
                                    category: true
                                }
                            }
                        },
                    })

                    return res.status(200).json(products)
                }
                const brands = await prisma.brand.findMany()
                const categories = await prisma.category.findMany()
                const countries = await prisma.country.findMany()
                const subcategories = await prisma.subcategory.findMany()
                const products = await prisma.product.findMany()
                return res.status(200).json({
                    success: true,
                    brands: brands.length,
                    categories: categories.length,
                    countries: countries.length,
                    subcategories: subcategories.length,
                    products: products.length,
                })
            } catch (error) {
                return res.status(400).json({ success: false, error })
            }
        case 'POST':
            try {
                const brands = await prisma.brand.createMany({
                    data: brandsData
                })
                const categories = await prisma.category.createMany({
                    data: categoriesData
                })
                const countries = await prisma.country.createMany({
                    data: countriesData
                })
                const subcategories = await prisma.subcategory.createMany({
                    data: subcategoriesData
                })
                const products = await prisma.product.createMany({
                    data: productsData
                })
                return res.status(200).json({
                    brands,
                    categories,
                    countries,
                    subcategories,
                    products,
                })
            } catch (error) {
                return res.status(400).json({ success: false, error })
            }
        case 'DELETE':
            try {
                if (brandsQ) {
                    const brands = await prisma.brand.deleteMany()
                    return res.status(200).json(brands)
                }
                if (categoriesQ) {
                    const categories = await prisma.category.deleteMany()
                    return res.status(200).json(categories)
                }
                if (countriesQ) {
                    const countries = await prisma.country.deleteMany()
                    return res.status(200).json(countries)
                }
                if (subcategoriesQ) {
                    const subcategories = await prisma.subcategory.deleteMany()
                    return res.status(200).json(subcategories)
                }
                if (productsQ) {
                    const products = await prisma.product.deleteMany()
                    return res.status(200).json(products)
                }
                const brands = await prisma.brand.deleteMany()
                const categories = await prisma.category.deleteMany()
                const countries = await prisma.country.deleteMany()
                const subcategories = await prisma.subcategory.deleteMany()
                const products = await prisma.product.deleteMany()
                return res.status(200).json({
                    success: true,
                    brands,
                    categories,
                    countries,
                    subcategories,
                    products,
                })
            }
            catch (error) {
                return res.status(400).json({ success: false, error })
            }
        default:
            res.status(400).json({ success: false })
            break
    }
}