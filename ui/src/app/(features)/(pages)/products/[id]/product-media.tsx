"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "../types";

export const ProductMedia = ({
  images,
  product,
}: {
  images: string[];
  product: Product;
}) => {
  const finalImages = [
    product.cover_image,
    ...(images || []),
  ].filter((img): img is string => Boolean(img));

  const [selectedImage, setSelectedImage] = useState(0);

  if (finalImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 flex items-center justify-center rounded-xl border border-gray-200">
        <span className="text-gray-400">No Image</span>
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden">
        <Image
          src={finalImages[selectedImage]}
          alt={product.product_name || "Product image"}
          width={600}
          height={600}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {finalImages.length > 1 && (
        <div className="flex gap-2 mt-4">
          {finalImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-16 h-16 rounded-md border ${
                index === selectedImage
                  ? "border-blue-500"
                  : "border-gray-200"
              } overflow-hidden`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
