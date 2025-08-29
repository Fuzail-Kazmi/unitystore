"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ArrowRight, Tag } from 'lucide-react';

type Product = {
    id: number;
    img: string;
    title: string;
    rating: number;
    reviewCount: number;
    originalPrice?: number;
    price: number;
    category?: string;
    slug?: string;
};

const products: Product[] = [
    {
        id: 1,
        img: "/images/product1-4.jpg",
        title: "iPhone 16 Pro Max",
        rating: 4.8,
        reviewCount: 2847,
        originalPrice: 1299,
        price: 1199,
    },
    {
        id: 2,
        img: "/images/product1-3.jpg",
        title: "AirPods Pro (2nd Gen)",
        rating: 4.6,
        reviewCount: 1523,
        originalPrice: 249,
        price: 199,
        category: "shirt",
    },
    {
        id: 3,
        img: "/images/product1-2.jpg",
        title: "MacBook Pro 16-inch",
        rating: 4.9,
        reviewCount: 892,
        originalPrice: 2999,
        price: 2699,
        category: "shirt",
    },
    {
        id: 4,
        img: "/images/product1-4.jpg",
        title: "iPad Pro 12.9-inch",
        rating: 4.7,
        reviewCount: 634,
        price: 1099,
        category: "shirt",
    },
    {
        id: 5,
        img: "/images/product1-3.jpg",
        title: "Apple Watch Ultra 2",
        rating: 4.5,
        reviewCount: 421,
        originalPrice: 849,
        price: 799,
        category: "shirt",
    },
    {
        id: 6,
        img: "/images/product1-2.jpg",
        title: "Studio Display 5K",
        rating: 4.4,
        reviewCount: 289,
        price: 1599,
        category: "shirt",
    },
    {
        id: 7,
        img: "/images/product1-4.jpg",
        title: "iPad 8.9-inch",
        rating: 4.7,
        reviewCount: 634,
        price: 199,
        category: "shirt",
    },
    {
        id: 8,
        img: "/images/product1-3.jpg",
        title: "Apple Watch Ultra fsafafafafafafafaffaffafafafafafafafa",
        rating: 4.5,
        reviewCount: 421,
        originalPrice: 849,
        price: 299,
        category: "shirt",
    },
];

const RelatedProducts = () => {
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);


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
                        className="group bg-white/85 rounded-lg  hover:shadow-sm transition-all duration-200 overflow-hidden border border-gray-100 sm:h-80"
                    >
                        <div className="relative overflow-hidden sm:max-h-[65%]">
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
                            {product.originalPrice && (
                                <div className="absolute top-4 left-4">
                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className='sm:h-[35%] p-2 flex flex-col justify-between gap-2'>
                            <div className='space-y-1'>
                                <h4 className="text-sm md:text-base text-gray-700 max-h-12 text-ellipsis overflow-hidden">
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
                                    <span className="text-sm sm:text-base font-bold text-gray-900">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-gray-400 line-through text-xs">${product.originalPrice}</span>
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