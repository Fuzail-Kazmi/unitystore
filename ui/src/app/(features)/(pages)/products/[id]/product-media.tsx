"use client";
import Image from "next/image";
import { Product } from "../types";

export const ProductMedia = ({ images, product }: { images: string[], product: Product }) => {
    return <Image
        src={images[0]}
        alt={product.product_name}
        width={600}
        height={600}
        className="w-full h-full object-contain p-4"
    />
}