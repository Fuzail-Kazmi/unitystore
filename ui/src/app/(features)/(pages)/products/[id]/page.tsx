import { API_URL } from "@/_api/index";
import { ProductMedia } from "./product-media";
import type { Product } from "@/app/(features)/(pages)/products/types";
import ProductActions from "./product-actions";
import ProductFAQ from "@/components/products/ProductFAQ";
import SideInfo from "@/components/products/sideinfo";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductTab from "@/components/products/ProductTab";
import RelatedProducts from "@/app/(features)/_components/related-products";
import Review from "@/components/products/review";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${API_URL}api/products/${params.id}/`, {
    next: { revalidate: 60 },
  });


  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product: Product = await res.json();
  console.log("Product ID from params:", product);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="border-b border-gray-200 overflow-x-auto whitespace-nowrap w-full hide-scrollbar">
        <div className="px-2 md:px-4 py-4 w-max ">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="w-max h-4 md:w-4 mx-2 " />
            <Link href="/" className="hover:text-gray-700">Products</Link>
            <ChevronRight className="w-max h-4 md:w-4 mx-2" />
            <Link href={`/`} className="hover:text-gray-700 capitalize">
              {product.category?.name}
            </Link>
            <ChevronRight className="w-max h-4 md:w-4 mx-2" />
            <span className="text-gray-900 font-medium">{product.product_name}</span>
          </div>
        </div>
      </div>
      <div className="px-2 md:px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <ProductMedia images={product.images} product={product} />
          </div>

          <div className="space-y-6">
            <p className="text-sm text-gray-500 mb-2">{product.brand?.name}</p>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              {product.product_name}
            </h1>

            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">
                  Rs.{product.final_price}
                </span>
                {product.discount_price && (
                  <span className="text-xl text-gray-500 line-through">
                    Rs.{product.price}
                  </span>
                )}
              </div>
            </div>

            <ProductActions product={product} />

            <div>
              <SideInfo />
            </div>
            <div>
              <ProductFAQ />
            </div>
          </div>
        </div>
      </div>
      <div className=" px-2 md:px-4 py-4">
          <ProductTab/>
      </div>
      <div className=" px-2 md:px-4 py-4">
          <Review/>
      </div>
      <div className=" px-2 md:px-4 py-4">
          <RelatedProducts/>
      </div>
    </div>
  );
}
