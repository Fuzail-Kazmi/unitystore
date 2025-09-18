"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { MessageCircle, Star, ThumbsUp, User } from "lucide-react";
import { useProductDetails, useProductReviews } from "@/api/product";

const ProductTab = () => {
  const { id } = useParams();

  const { data: product, isLoading: productLoading, error: productError } =
    useProductDetails(id as string);
  const { data: reviewsData, isLoading: reviewsLoading } =
    useProductReviews(id as string);

  const [activeTab, setActiveTab] = useState("description");

  const renderStars = (rating: number, size = "h-4 w-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const reviews = reviewsData || [];

  if (productLoading) {
    return <p className="text-gray-500 text-center py-8">Loading product...</p>;
  }

  if (productError || !product) {
    return <p className="text-red-500 text-center py-8">Failed to load product.</p>;
  }

  return (
    <div className="mt-16 w-full max-w-6xl mx-auto">
      <div className="border-b border-gray-200 overflow-x-auto hide-scrollbar whitespace-nowrap">
        <nav className="-mb-px flex gap-8">
          {["description", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="py-8 space-y-6">
        {activeTab === "description" && (
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {reviewsLoading ? (
              <p className="text-gray-500">Loading reviews...</p>
            ) : reviews.length > 0 ? (
              reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{review.customer_name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful ({review.helpful || 0})
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                      <MessageCircle className="h-4 w-4" />
                      Reply
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTab;
