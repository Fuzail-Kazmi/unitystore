"use client";

import { useState } from "react";
import QuantitySelector from "@/components/products/QuantitySelector";
import type { Product } from "@/app/(features)/(pages)/products/types";
import AddToCartButton from "@/components/products/AddToCartButton";
import BuyButton from "@/components/products/BuyButton";


export default function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-2">
      <QuantitySelector
        initialQty={1}
        min={1}
        onChange={(qty) => setQuantity(qty)}
      />

      <AddToCartButton
        productId={product.id}
        productName={product.product_name}
        quantity={quantity}
      />

      <BuyButton onClick={() => alert("Buying...")}>
        Buy Now
      </BuyButton>

    </div>
  );
}


