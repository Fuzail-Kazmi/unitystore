"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCategories } from "@/api/category";

const CategoryCarousel: React.FC<{
  autoPlayInterval?: number;
  showDots?: boolean;
}> = ({ autoPlayInterval = 3000, showDots = true }) => {
  const { data: categories = [], isLoading, isError } = useCategories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const itemWidth = 155;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHovered && categories.length > 0) {
      const interval = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isHovered, categories.length, autoPlayInterval]);

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === categories.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Loading categories...</p>
      </div>
    );
  }

  if (isError || !categories.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No categories available</p>
      </div>
    );
  }

  return (
    <div
      className="mt-8 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 ease-in-out space-x-2"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
          }}
        >
          {categories.concat(categories).map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: `${itemWidth}px` }}
            >
              <div className="flex flex-col items-center p-2 rounded-lg bg-white shadow hover:bg-gray-100 transition-all duration-300 hover:scale-105 cursor-pointer group">
                <div className="w-20 h-20 md:w-24 md:h-24 mb-3 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-center text-gray-500 group-hover:text-blue-400 transition-colors max-w-22 truncate">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden sm:block">
        {showDots && categories.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer  ${index === currentIndex
                    ? "bg-blue-400 w-6"
                    : "bg-gray-400 w-2 hover:bg-gray-500"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryComponent = () => {
  return (
    <div>
      <CategoryCarousel autoPlayInterval={2000} showDots={true} />
    </div>
  );
};

export default CategoryComponent;

