"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCategories } from "@/app/(features)/_api/category"; 

const CategoryCarousel: React.FC<{
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
}> = ({
  autoPlayInterval = 3000,
  showArrows = true,
  showDots = true,
}) => {
  const { data: categories = [], isLoading, isError } = useCategories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered && categories.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === categories.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [isHovered, categories.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? categories.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === categories.length - 1 ? 0 : currentIndex + 1
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
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-full flex-shrink-0 relative"
            >
              <div className="flex gap-4 py-4">
                <div
                  className="flex flex-col items-center p-2 rounded-lg bg-white shadow hover:bg-gray-100 transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-center text-gray-400 group-hover:text-yellow-300 transition-colors max-w-22">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showArrows && categories.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous category"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next category"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {showDots && categories.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-400 w-6"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryCarouselDemo = () => {
  return (
    <div>
      <CategoryCarousel autoPlayInterval={1500} showArrows={true} showDots={true} />
    </div>
  );
};

export default CategoryCarouselDemo;
