"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";


const POPULAR_CATEGORIES: { label: string; img: string; href: string }[] = [
    { label: "Electronics", img: "/images/product1-1.jpg", href: "#" },
    { label: "Fashion", img: "/images/product1-2.jpg", href: "#" },
    { label: "Luxury", img: "/images/product1-3.jpg", href: "#" },
    { label: "Home Decor", img: "/images/product1-4.jpg", href: "#" },
    { label: "Health & Beauty", img: "/images/product1-5.jpg", href: "#" },
    { label: "Groceries", img: "/images/product1-6.jpg", href: "#" },
    { label: "Sneakers", img: "/images/product1-5.jpg", href: "#" },
    { label: "Sports", img: "/images/product1-4.jpg", href: "#" },
];


export default function Category() {
    const cats = useMemo(() => POPULAR_CATEGORIES, []);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        const { clientWidth } = scrollRef.current;
        scrollRef.current.scrollBy({
            left: dir === "right" ? clientWidth : -clientWidth,
            behavior: "smooth",
        });
    };

    return (
        <section className="mt-8 relative">
            <h3 className="text-xl font-semibold mb-4">
                Explore Popular Categories
            </h3>

            <button
                onClick={() => scroll("left")}
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100 hidden md:flex"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth"
            >
                {cats.map((c) => (
                    <Link
                        key={c.label}
                        href={c.href}
                        className="flex flex-col items-center flex-shrink-0"
                    >
                        <div className="size-24 md:size-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                            <Image
                                src={c.img}
                                alt={c.label}
                                width={96}
                                height={96}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-sm md:text-[15px] font-medium text-gray-800 mt-2 text-center">
                            {c.label}
                        </span>
                    </Link>
                ))}
            </div>

            <button
                onClick={() => scroll("right")}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100 hidden md:flex"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </section>
    );
};

