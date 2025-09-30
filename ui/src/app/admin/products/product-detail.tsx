"use client";
import React from "react";
import { ChevronLeft, Edit, Trash2, Star, Calendar } from "lucide-react";

interface ProductDetailProps {
  product: any;
  setCurrentView: (view: string) => void;
  setSelectedProduct: (product: any) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, setCurrentView, setSelectedProduct }) => {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView("list")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </button>
          <h1 className="text-lg font-semibold text-gray-700">{product.product_name}</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedProduct(product);
              setCurrentView("edit");
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button className="flex items-center gap-3 px-2 py-2 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50 cursor-pointer">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-4">
        {/* Images */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
            <div className="space-y-4">
              <img
                src={product.cover_image}
                alt={product.product_name}
                className="w-full aspect-square object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-gray-900">{product.category?.name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Brand</label>
                  <p className="text-gray-900">{product.brand?.name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Price</label>
                  <p className="text-gray-900 font-semibold">Rs. {product.price}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Discount Price</label>
                  <p className="text-gray-900 font-semibold">
                    {product.discount_price ? `Rs. ${product.discount_price}` : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Rating</label>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900">{product.rating}</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-900 mt-1">{product.description || "No description available"}</p>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="text-gray-900">{new Date(product.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-gray-900">{new Date(product.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
