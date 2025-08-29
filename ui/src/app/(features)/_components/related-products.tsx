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
    originalPrice?: string;
    price: string;
    discount?: string;
    badge?: string;
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
        originalPrice: "$1,299",
        price: "$1,199",
        discount: "8%",
        badge: "Hot",
    },
    {
        id: 2,
        img: "/images/product1-3.jpg",
        title: "AirPods Pro (2nd Gen)",
        rating: 4.6,
        reviewCount: 1523,
        originalPrice: "$249",
        price: "$199",
        discount: "20%",
        badge: "Sale",
        category: "shirt",
    },
    {
        id: 3,
        img: "/images/product1-2.jpg",
        title: "MacBook Pro 16-inch",
        rating: 4.9,
        reviewCount: 892,
        originalPrice: "$2,999",
        price: "$2,699",
        discount: "10%",
        category: "shirt",
    },
    {
        id: 4,
        img: "/images/product1-4.jpg",
        title: "iPad Pro 12.9-inch",
        rating: 4.7,
        reviewCount: 634,
        price: "$1,099",
        badge: "New",
        category: "shirt",
    },
    {
        id: 5,
        img: "/images/product1-3.jpg",
        title: "Apple Watch Ultra 2",
        rating: 4.5,
        reviewCount: 421,
        originalPrice: "$849",
        price: "$799",
        discount: "6%",
        category: "shirt",
    },
    {
        id: 6,
        img: "/images/product1-2.jpg",
        title: "Studio Display 5K",
        rating: 4.4,
        reviewCount: 289,
        price: "$1,599",
        category: "shirt",
    },
    {
        id: 7,
        img: "/images/product1-4.jpg",
        title: "iPad 8.9-inch",
        rating: 4.7,
        reviewCount: 634,
        price: "$199",
        badge: "New",
        category: "shirt",
    },
    {
        id: 8,
        img: "/images/product1-3.jpg",
        title: "Apple Watch Ultra",
        rating: 4.5,
        reviewCount: 421,
        originalPrice: "$849",
        price: "$299",
        discount: "10%",
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

    const toggleWishlist = (productId: number) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300'
                    }`}
            />
        ));
    };

    const getBadgeStyle = (badge: string) => {
        switch (badge) {
            case 'Hot':
                return 'bg-gradient-to-r from-red-500 to-pink-500';
            case 'Sale':
                return 'bg-gradient-to-r from-orange-500 to-red-500';
            case 'New':
                return 'bg-gradient-to-r from-green-500 to-emerald-500';
            default:
                return 'bg-gradient-to-r from-blue-500 to-indigo-500';
        }
    };

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

            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4 sm:grid-cols-3">
                {displayedProducts.map((product) => (
                    <Link
                        href={`/products/${product.id}`}
                        key={product.id}
                        className="group relative border border-gray-100 rounded-lg hover:shadow-sm transition-all duration-200 overflow-hidden space-y-1 bg-white/85 p-2"
                    >
                        <div className="relative aspect-square bg-gray-50 overflow-hidden">
                            {product.badge && (
                                <div className={`absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded text-white text-[10px] font-bold ${getBadgeStyle(product.badge)}`}>
                                    {product.badge}
                                </div>
                            )}

                            {product.discount && (
                                <div className="absolute top-1.5 right-1.5 z-10 bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                                    -{product.discount}
                                </div>
                            )}
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className={`absolute bottom-1.5 right-1.5 z-10 p-1.5 rounded-full transition-all duration-200 ${wishlist.includes(product.id)
                                    ? 'bg-red-50 text-red-500'
                                    : 'bg-white/80 text-gray-400 hover:bg-red-50 hover:text-red-500'
                                    } shadow-sm`}
                            >
                                <Heart className={`h-3 w-3 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                            </button>

                            <div className="bg-white/50 rounded-md p-2">
                                <Image
                                    src={product.img}
                                    alt={product.title}
                                    fill
                                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                        </div>

                        <div className="p-2 space-y-1">
                            <h4 className="text-xs font-medium lg:text-sm text-gray-700 max-h-10 text-ellipsis overflow-hidden ">
                                {product.title}
                            </h4>

                            <div className="flex items-center gap-1">
                                <div className="flex">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="text-[10px] text-gray-500">
                                    ({product.reviewCount > 999 ? `${Math.floor(product.reviewCount / 1000)}k` : product.reviewCount})
                                </span>
                            </div>

                            <div className="flex items-center gap-1 flex-wrap">
                                <span className="text-sm font-bold text-gray-900">
                                    {product.price}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-[10px] text-gray-400 line-through">
                                        {product.originalPrice}
                                    </span>
                                )}
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