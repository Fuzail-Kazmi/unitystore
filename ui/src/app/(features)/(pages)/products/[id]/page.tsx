
import React from "react";
import axios from "axios";
import { ProductMedia } from "./product-media";
import { API_URL } from "@/api";
import type { Product } from "@/app/(features)/(pages)/products/types";


// const Index = async (
//     { params }: {
//         params: { id: string }
//     }
// ) => {
//     const { data: product }: { data: Product } = await axios.get(`${API_URL}api/products/${params.id}/`);


//     return <div className="max-w-6xl mx-auto">

//         <div className="px-2 md:px-4 py-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//                 <div className="space-y-4">
//                     <ProductMedia images={product.images} product={product} />
//                 </div>
//                 <div className="space-y-6">
//                     <div>
//                         {/* <p className="text-sm text-gray-500 mb-2">{product.brand}</p> */}
//                         <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
//                             {product.product_name}
//                         </h1>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// }


const Index = () => {
  return (
    <div className="max-w-6xl mx-auto">page</div>
  )
}

export default Index