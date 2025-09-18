"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/api/cart";

interface AddToCartButtonProps {
    productId: string;
    productName: string;
    quantity?: number;
}

export default function AddToCartButton({
    productId,
    productName,
    quantity = 1,
}: AddToCartButtonProps) {
    const [loading, setLoading] = useState(false);
    const addToCart = useAddToCart();

    const handleAddToCart = () => {
        setLoading(true);
        addToCart.mutate(
            //   {
            //     product_id: String(productId),
            //     quantity: 1,
            //   },
            {
                product_id: productId,
                quantity
            },
            {
                onSuccess: () => {
                    toast.success(`${productName} added to cart! 🛒`);
                    setLoading(false);
                },
                onError: (error: any) => {
                    toast.error(
                        error?.response?.data?.detail || "Failed to add to cart"
                    );
                    setLoading(false);
                },
            }
        );
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/95 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
            <ShoppingCart className="h-5 w-5" />
            {loading ? "Adding..." : "Add to Cart"}
        </button>
    );
}
