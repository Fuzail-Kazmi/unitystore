"use client";
import React from "react";
import { ChevronLeft, Edit, Trash2, Folder, Calendar } from "lucide-react";

const CategoryDetail = ({ category, mockCategories, setCurrentView, setSelectedCategory }) => {
  const subcategories = mockCategories.filter((cat) => cat.parent === category.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('list')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Categories
          </button>
          <h1 className="text-lg font-semibold text-gray-700">{category.name}</h1>
          {category.parent_name && (
            <span className="text-sm text-gray-500">
              in {category.parent_name}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedCategory(category);
              setCurrentView('edit');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm cursor-pointer">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Image */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Image</h2>
            <img
              src={category.image}
              alt={category.name}
              className="w-full aspect-video object-cover rounded-lg border border-gray-200"
            />
          </div>
        </div>

        {/* Category Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Category Name</label>
                <p className="text-gray-900 font-semibold text-lg">{category.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Parent Category</label>
                <p className="text-gray-900">{category.parent_name || 'Main Category'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Total Products</label>
                <p className="text-gray-900 font-semibold">{category.product_count} products</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Subcategories</label>
                <p className="text-gray-900 font-semibold">{category.subcategories?.length || 0} subcategories</p>
              </div>
            </div>
          </div>

          {/* Subcategories */}
          {subcategories.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Subcategories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subcategories.map(subcat => (
                  <div
                    key={subcat.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(subcat);
                      setCurrentView('detail');
                    }}
                  >
                    <Folder className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{subcat.name}</p>
                      <p className="text-xs text-gray-500">{subcat.product_count} products</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="text-gray-900">{new Date(category.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-gray-900">{new Date(category.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
