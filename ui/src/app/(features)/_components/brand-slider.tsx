// "use client";

// import React, { useEffect, useRef } from 'react';
// import Image from 'next/image';
// import { useBrandsList } from "@/api/brand";


// const BrandSlider = () => {
//     const sliderRef = useRef<HTMLDivElement>(null);
//     const { data: brands, isLoading, error } = useBrandsList();

//     useEffect(() => {
//         const slider = sliderRef.current;
//         if (!slider) return;

//         let animationId: number;
//         let startTime: number;
//         const duration = 30000;
//         const totalWidth = slider.scrollWidth / 2;

//         const animate = (timestamp: number) => {
//             if (!startTime) startTime = timestamp;
//             const elapsed = timestamp - startTime;

//             const progress = (elapsed % duration) / duration;
//             const translateX = -(progress * totalWidth);

//             slider.style.transform = `translateX(${translateX}px)`;

//             animationId = requestAnimationFrame(animate);
//         };

//         animationId = requestAnimationFrame(animate);

//         const handleMouseEnter = () => {
//             if (animationId) {
//                 cancelAnimationFrame(animationId);
//             }
//         };

//         const handleMouseLeave = () => {
//             startTime = performance.now() - ((performance.now() - startTime) % duration);
//             animationId = requestAnimationFrame(animate);
//         };

//         slider.addEventListener('mouseenter', handleMouseEnter);
//         slider.addEventListener('mouseleave', handleMouseLeave);

//         return () => {
//             if (animationId) {
//                 cancelAnimationFrame(animationId);
//             }
//             slider.removeEventListener('mouseenter', handleMouseEnter);
//             slider.removeEventListener('mouseleave', handleMouseLeave);
//         };
//     }, []);

//     if (isLoading) {
//         return (
//             <section className="py-8 sm:py-12 lg:py-16 text-center">
//                 <p className="text-gray-500">Loading brands...</p>
//             </section>
//         );
//     }

//     if (error) {
//         return (
//             <section className="py-8 sm:py-12 lg:py-16 text-center">
//                 <p className="text-red-500">Failed to load brands</p>
//             </section>
//         );
//     }

//     return (
//         <section className="py-8 sm:py-12 lg:py-16 overflow-hidden">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="text-center mb-8 sm:mb-12">
//                     <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
//                         Trusted by Leading Brands
//                     </h2>
//                     <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
//                         We partner with the world's most innovative technology companies to bring you the best products
//                     </p>
//                 </div>

//                 <div className="relative">
//                     <div className="absolute left-0 top-0 w-12 sm:w-24 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
//                     <div className="absolute right-0 top-0 w-12 sm:w-24 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

//                     <div className="overflow-hidden">
//                         {/* <div
//                             ref={sliderRef}
//                             className="flex items-center gap-8 sm:gap-12 lg:gap-16 will-change-transform"
//                             style={{ width: 'fit-content' }}
//                         >
//                             {brands?.map((brand, index) => (
//                                 <div
//                                     key={`first-${index}`}
//                                     className="flex-shrink-0 group cursor-pointer"
//                                 >
//                                     <div className="w-20 h-12 sm:w-28 sm:h-16 lg:w-36 lg:h-20 relative flex items-center justify-center rounded-lg transition-all duration-300 ">
//                                         <Image
//                                             src={brand.image || "/placeholder.png"}
//                                             alt={brand.name}
//                                             width={144}
//                                             height={80}
//                                             className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
//                                         />
//                                     </div>
//                                 </div>
//                             ))}

//                             {brands?.map((brand, index) => (
//                                 <div
//                                     key={`second-${index}`}
//                                     className="flex-shrink-0 group cursor-pointer"
//                                 >
//                                     <div className="w-20 h-12 sm:w-28 sm:h-16 lg:w-36 lg:h-20 relative flex items-center justify-center rounded-lg  transition-all duration-300 hover:shadow-md">
//                                         <Image
//                                             src={brand.image || "/placeholder.png"}
//                                             alt={brand.name}
//                                             width={144}
//                                             height={80}
//                                             className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
//                                         />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div> */}
//                         <div
//                             ref={sliderRef}
//                             className="flex items-center gap-8 sm:gap-12 lg:gap-16 will-change-transform"
//                             style={{ width: "fit-content" }}
//                         >
//                             {[...(brands || []), ...(brands || [])].map((brand, index) => (
//                                 <div
//                                     key={`${brand.id}-${index}`}
//                                     className="flex-shrink-0 group cursor-pointer"
//                                 >
//                                     <div className="w-20 h-12 sm:w-28 sm:h-16 lg:w-36 lg:h-20 relative flex items-center justify-center">
//                                         <Image
//                                             src={brand.image || "/placeholder.png"}
//                                             alt={brand.name}
//                                             width={144}
//                                             height={80}
//                                             className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
//                                             priority={index < 7}
//                                         />
//                                     </div>
//                                 </div>
//                             ))}

//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default BrandSlider;







"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useBrandsList } from "@/api/brand";


const BrandSlider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const { data: brands, isLoading, error } = useBrandsList();

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let animationId: number;
        let startTime: number;
        const duration = 30000;
        const totalWidth = slider.scrollWidth / 2;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            const progress = (elapsed % duration) / duration;
            const translateX = -(progress * totalWidth);

            slider.style.transform = `translateX(${translateX}px)`;

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        const handleMouseEnter = () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };

        const handleMouseLeave = () => {
            startTime = performance.now() - ((performance.now() - startTime) % duration);
            animationId = requestAnimationFrame(animate);
        };

        slider.addEventListener('mouseenter', handleMouseEnter);
        slider.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            slider.removeEventListener('mouseenter', handleMouseEnter);
            slider.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    if (isLoading) {
        return (
            <section className="py-8 sm:py-12 lg:py-16 text-center">
                <p className="text-gray-500">Loading brands...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-8 sm:py-12 lg:py-16 text-center">
                <p className="text-red-500">Failed to load brands</p>
            </section>
        );
    }

    return (
        <section className="py-8 sm:py-12 lg:py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                        Trusted by Leading Brands
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                        We partner with the world's most innovative technology companies to bring you the best products
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-0 w-12 sm:w-24 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 w-12 sm:w-24 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

                    <div className="overflow-hidden">
                        <div
                            ref={sliderRef}
                            className="flex items-center gap-8 sm:gap-12 lg:gap-16 will-change-transform"
                            style={{ width: 'fit-content' }}
                        >
                            {brands?.map((brand, index) => (
                                <div
                                    key={`first-${index}`}
                                    className="flex-shrink-0 group cursor-pointer"
                                >
                                    <div className="w-20 h-12 sm:w-28 sm:h-16 lg:w-36 lg:h-20 relative flex items-center justify-center rounded-lg transition-all duration-300 ">
                                        <Image
                                            src={brand.image || "/placeholder.png"}
                                            alt={brand.name}
                                            width={144}
                                            height={80}
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            ))}

                            {brands?.map((brand, index) => (
                                <div
                                    key={`second-${index}`}
                                    className="flex-shrink-0 group cursor-pointer"
                                >
                                    <div className="w-20 h-12 sm:w-28 sm:h-16 lg:w-36 lg:h-20 relative flex items-center justify-center rounded-lg  transition-all duration-300 hover:shadow-md">
                                        <Image
                                            src={brand.image || "/placeholder.png"}
                                            alt={brand.name}
                                            width={144}
                                            height={80}
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div
                            ref={sliderRef}
                            className="flex items-center gap-8 sm:gap-12 lg:gap-16 will-change-transform"
                            style={{ width: "fit-content" }}
                        >
                            {[...(brands || []), ...(brands || [])].map((brand, index) => (
                                <div
                                    key={`${brand.id}-${index}`}
                                    className="flex-shrink-0 group cursor-pointer"
                                >
                                    <div className="w-20 h-12 sm:w-28 sm:h-16 lg:w-36 lg:h-20 relative flex items-center justify-center">
                                        <Image
                                            src={brand.image || "/placeholder.png"}
                                            alt={brand.name}
                                            width={144}
                                            height={80}
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                                            priority={index < 7}
                                        />
                                    </div>
                                </div>
                            ))}

                        </div> */}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandSlider;







