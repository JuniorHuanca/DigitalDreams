import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"
import brandsData from '@/shared/util/data/brands'
import categoriesData from '@/shared/util/data/categories'
import countriesData from '@/shared/util/data/countries'
import productsData from '@/shared/util/data/products'
import subcategoriesData from '@/shared/util/data/subcategories'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { recommended, brand, mostSelling } = req.query
    switch (method) {
        case 'GET':
            try {
                // const brands = await prisma.brand.findMany()
                // const categories = await prisma.category.findMany()
                // const countries = await prisma.country.findMany()
                // const subcategories = await prisma.subcategory.findMany()
                if (recommended) {
                    const subcategories = await prisma.subcategory.findMany({
                        orderBy: {
                            name: 'asc'
                        }
                    });
                    const products = await Promise.all(subcategories.map(async subcategory => {
                        const product = await prisma.product.findFirst({
                            where: {
                                subcategory_id: subcategory?.id
                            },
                            include: {
                                brand: true,
                                subcategory: {
                                    include: {
                                        category: true
                                    }
                                }
                            },
                        });

                        return product;
                    }));
                    return res.status(200).json({
                        success: true,
                        products: products,
                    })
                }
                if (mostSelling) {
                    const products = await prisma.product.findMany({
                        take: 20,
                        include: {
                            brand: true,
                            subcategory: {
                                include: {
                                    category: true
                                }
                            }
                        },
                        orderBy: {
                            soldCount: 'desc'
                        }
                    });

                    return res.status(200).json({
                        success: true,
                        products: products,
                    });

                }
                if (brand) {
                    const findBrand = await prisma.brand.findFirst({
                        where: {
                            name: brand as string
                        }
                    })
                    const products = await prisma.product.findMany({
                        where: { brand_id: findBrand?.id },
                        include: {
                            brand: true,
                            subcategory: {
                                include: {
                                    category: true
                                }
                            }
                        },
                    })
                    return res.status(200).json({
                        success: true,
                        products: products,
                    })
                }
                const products = await prisma.product.findMany({
                    take: 10,
                    include: {
                        brand: true,
                        subcategory: {
                            include: {
                                category: true
                            }
                        }
                    },
                    orderBy: {
                        name: 'asc'
                    }
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