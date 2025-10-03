"use client";

import { useState } from "react";
import QuantitySelector from "@/components/products/QuantitySelector";
import type { Product } from "@/app/(features)/(pages)/products/types";
import AddToCartButton from "@/components/products/AddToCartButton";
import BuyNowButton from "@/components/products/BuyButton";


export default function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-2">
      {/* <QuantitySelector
        initialQty={1}
        min={1}
        onChange={(qty) => setQuantity(qty)}
      /> */}

      <AddToCartButton
        productId={product.id}
        productName={product.product_name}
        quantity={quantity}
        className="flex-1 bg-primary hover:bg-primary/95 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      />

      <BuyNowButton
        productId={product.id}
        productName={product.product_name}
        quantity={quantity}
        className="flex-1 bg-black hover:bg-black/95 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        label="Buy Now"
      />

    </div>
  );
}


