import React from "react";
import { ChevronLeft, Edit, Trash2, Calendar } from "lucide-react";

const BrandDetail = ({ brand, setCurrentView, setSelectedBrand }) => {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView("list")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Brands
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{brand.name}</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedBrand(brand);
              setCurrentView("edit");
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Brand Logo */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Brand Logo</h2>
            <img
              src={brand.image}
              alt={brand.name}
              className="w-76 h-76 object-contain rounded-lg border border-gray-200"
            />
          </div>
        </div>

        {/* Brand Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Brand Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Brand Name</label>
                <p className="text-gray-900 font-semibold text-lg">{brand.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-900 mt-1">
                  {brand.description || "No description available"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Total Products</label>
                <p className="text-gray-900 font-semibold">{brand.product_count} products</p>
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
                  <p className="text-gray-900">
                    {new Date(brand.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-gray-900">
                    {new Date(brand.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;
