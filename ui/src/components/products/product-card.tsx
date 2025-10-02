import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { cn, formatCurrency } from "@/utils";


type ProductType = {
    id: string;
    brand: string;
    product_name: string;
    final_price: number;
    price: number | null;
    rating: number;
    reviews: number;
    cover_image: string;
    category: string;
    inStock: boolean;
};


const Rating = ({ count = 0, range = 5 }) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(range)].map((_, i) => (
                <Star
                    key={i}
                    className={cn("h-4 w-4", i < Math.floor(count) ? "text-yellow-500 fill-current" : "text-gray-300")}
                />
            ))}
        </div>
    )
}


const ProductCard = ({ product }: { product: ProductType }) => (
    <Link
        href={`/products/${product.id}`}
        key={product.id}
    >
        <div className="rounded-md border border-border shadow-sm transition-all"
        >
            <div className="h-[240px] ">
                <img
                    src={product.cover_image}
                    alt={product.product_name}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className='sm:h-[35%] p-2 flex flex-col justify-between gap-2'>
                <div className='space-y-1'>
                    <h4 className="text-sm md:text-base text-gray-700 max-h-12 text-ellipsis overflow-hidden">
                        {product.product_name}
                    </h4>
                </div>

                <div><Rating count={product.rating} /></div>
                <div className="font-medium">{formatCurrency(product.price)}</div>

                {/* <span className="flex items-center gap-1 text-xs text-gray-600 ml-1">
                        <span>
                            {product.rating}
                        </span>
                        <span className='hidden sm:block'>
                            ({product.reviews})
                        </span>
                    </span> */}

                {/* <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-gray-900">${product.final_price}</span>
                        {product.price && (
                            <span className="text-gray-400 line-through text-xs">${product.price}</span>
                        )}
                    </div>
                </div> */}
            </div>
        </div>

    </Link >
);


export { ProductCard };