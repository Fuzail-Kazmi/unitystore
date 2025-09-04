"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import RelatedProducts from "../_components/related-products";

type Slide = {
  img: string;
  title: string;
  priceLine?: string;
  desc?: string;
  cta?: { label: string; href: string };
};

const HERO_SLIDES: Slide[] = [
  {
    img: "/images/header1.jpg",
    title: "iPhone 16 Pro Max",
    priceLine: "From $ 50,769*",
    desc: "A18 chip. Superfast. Supersmart. History’s Biggest Price Drop",
    cta: { label: "Shop Now", href: "#" },
  },
  {
    img: "/images/header4.jpg",
    title: "Pure Sound",
    priceLine: "Save up to 40%",
    desc: "Noise cancelling over-ear headphones.",
    cta: { label: "Shop Audio", href: "#" },
  },
  {
    img: "/images/header5.jpg",
    title: "Creator Laptops",
    priceLine: "Mega Offers",
    desc: "Top performance for pros and students.",
    cta: { label: "Explore Laptops", href: "#" },
  },
];

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

function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setIndex((i) => (i + 1) % count);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [index]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(next, 3000); 
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-gray-100"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="min-w-full relative h-[260px] md:h-[360px]">
            <Image
              src={s.img}
              alt={s.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center gap-2 px-5 md:px-10">
              <h2 className="text-white font-bold text-2xl md:text-4xl leading-tight drop-shadow">
                {s.title}
              </h2>
              {s.priceLine && (
                <p className="text-white/95 text-lg md:text-2xl font-semibold">
                  {s.priceLine}
                  <span className="text-xs md:text-sm opacity-80 ml-1">
                    *Incl. All Offers
                  </span>
                </p>
              )}
              {s.desc && (
                <p className="text-white/90 max-w-xl text-sm md:text-base">
                  {s.desc}
                </p>
              )}
              {s.cta && (
                <Link
                  href={s.cta.href}
                  className="mt-2 inline-flex w-fit items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                  {s.cta.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === index ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const slides = useMemo(() => HERO_SLIDES, []);
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
    <main className="max-w-6xl mx-auto px-2 md:px-4 py-4">
      <section className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4 ">
        <HeroCarousel slides={slides} />
        <Link
          href="#"
          className="relative rounded-xl overflow-hidden bg-gray-100 h-[260px] md:h-[360px] hidden md:block"
        >
          <Image
            src="/images/box1-4.jpg"
            alt="SALE up to 50% OFF"
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4">
            <div className="inline-flex items-center rounded-md bg-white/95 px-3 py-1 text-xs font-semibold">
              SALE
            </div>
            <div className="mt-2 text-white drop-shadow">
              <div className="text-4xl md:text-5xl font-extrabold leading-none">
                UP TO
                <br />
                50%
              </div>
              <div className="text-base md:text-lg font-semibold">OFF</div>
            </div>
          </div>
        </Link>
      </section>

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

      <RelatedProducts/>
    </main>
  );
};

