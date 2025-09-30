import React from "react";
import { Plus, Search, Tag } from "lucide-react";

const BrandList = ({
  brands,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  setCurrentView,
  setSelectedBrand,
}) => {
  const brandTableHeaders = [
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "product_count", label: "Products" },
    { key: "created_at", label: "Created At" },
    { key: "updated_at", label: "Updated At" },
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Brands</h1>
          <p className="text-xs sm:text-sm text-gray-600">Manage your product brands</p>
        </div>
        <button
          onClick={() => setCurrentView("add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Brand
        </button>
      </div>

      {/* Search and Sort */}
      <div className="bg-white rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-0 focus:ring-0 focus:border-0 text-xs"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer text-xs"
            >
              <option value="name">Name A-Z</option>
              <option value="created_at">Newest First</option>
              <option value="product_count">Most Products</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-h-[68vhh] h-[68vh] overflow-auto hide-scrollbar">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-400 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              {brandTableHeaders.map((col) => (
                <th key={col.key} className="px-4 py-4 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 border-gray-900">
            {brands.map((brand) => (
              <tr
                key={brand.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedBrand(brand);
                  setCurrentView("detail");
                }}
              >
                <td className="px-4 py-2">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-12 h-12 object-cover rounded border border-gray-200"
                  />
                </td>
                <td className="px-4 py-2 font-medium text-gray-900">{brand.name}</td>
                <td className="px-4 py-2 text-gray-600 max-w-xs truncate">
                  {brand.description || "—"}
                </td>
                <td className="px-4 py-2 text-gray-600">{brand.product_count}</td>
                <td className="px-4 py-2 text-gray-600 text-xs">
                  {new Date(brand.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-gray-600 text-xs">
                  {new Date(brand.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {brands.length === 0 && (
              <tr>
                <td colSpan={brandTableHeaders.length} className="text-center py-12">
                  <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No brands found
                  </h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                  <button
                    onClick={() => setCurrentView("add")}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-colors cursor-pointer text-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add First Brand
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandList;
