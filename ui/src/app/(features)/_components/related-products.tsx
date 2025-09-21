"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Heart, Star, ArrowRight, Tag } from 'lucide-react';
import { useProductsList } from "@/api/product";


type Product = {
    id: string;
    img: string;
    title: string;
    rating: number;
    reviewCount: number;
    originalPrice?: number;
    price: number;
    category?: string;
    slug?: string;
};

const RelatedProducts = () => {
    const [isMobile, setIsMobile] = useState(false);

    const { data, isLoading, error } = useProductsList();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) {
        console.error("Product API error:", error);
        return <p>Something went wrong!</p>;
    }

    const products: Product[] = (data?.results || []).map((p: any) => ({
        id: p.id,
        img: p.cover_image || "/images/product1-4.jpg",
        title: p.product_name,
        rating: p.rating || 0,
        reviewCount: p.review_count || 0,
        originalPrice: undefined,
        price: parseFloat(p.final_price),
        category: p.category?.name,
        slug: p.id,
    }));

    const displayedProducts = isMobile
        ? products.slice(0, 20)
        : products.slice(0, 25);

    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Related Products
                    </h3>
                </div>
                <Link
                    href="/products"
                    className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1 group"
                >
                    View All
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 sm:grid-cols-3">
                {displayedProducts.map((product) => (
                    <Link
                        href={`/products/${product.id}`}
                        key={product.id}
                        className="group bg-white/85 rounded-lg  hover:shadow-sm transition-all duration-200 overflow-hidden border border-gray-100 sm:h-90"
                    >
                        <div className="relative overflow-hidden sm:h-[65%]">
                            <img
                                src={product.img}
                                alt={product.title}
                                className="bg-white/50 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors cursor-pointer">
                                    <Heart className="h-4 w-4 text-gray-700" />
                                </button>
                            </div>
                        </div>
                        <div className='sm:h-[35%] p-2 flex flex-col justify-between gap-2'>
                            <div className='space-y-2'>
                                <h4 className="text-sm md:text-base text-gray-700 max-h-10 sm:max-h-11 text-ellipsis overflow-hidden">
                                    {product.title}
                                </h4>

                                <div className="flex items-center gap-1">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="flex items-center gap-1 text-xs text-gray-600 ml-1">
                                        <span>
                                            {product.rating}
                                        </span>
                                        <span className='hidden sm:block'>
                                            ({product.reviewCount})
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm sm:text-base font-bold text-gray-900">Rs.{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-gray-400 line-through text-xs">Rs{product.originalPrice}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-6 flex justify-center sm:hidden">
                <Link
                    href="/products"
                    className="bg-white/85 hover:bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Tag className="h-4 w-4" />
                    View All Deals
                </Link>
            </div>
        </section>
    );
};

export default RelatedProducts; 