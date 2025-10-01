"use client";
import React, { useMemo, useState } from "react";
import { Plus, Search, Package } from "lucide-react";
import { useProductsList } from "@/api/product";
import { useCategories } from "@/api/category";

interface ProductListProps {
  setCurrentView: (view: string) => void;
  setSelectedProduct: (product: any) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  setCurrentView,
  setSelectedProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("-created_at");

  const { data, isLoading, isError } = useProductsList({
    category: filterBy !== "all" ? filterBy : undefined,
  });

  const { data: categories = [] } = useCategories();

  const products = data?.results || data || [];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchTerm) {
      list = list.filter((p: any) =>
        p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "-created_at") {
      list = list.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "product_name") {
      list = list.sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    } else if (sortBy === "price") {
      list = list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "-price") {
      list = list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "-rating") {
      list = list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, searchTerm, sortBy]);

  if (isLoading) {
    return <div className="p-6">Loading products...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load products.</div>;
  }

  const tableHeaders = [
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "active", label: "Active" },
    { key: "created_at", label: "Created At" },
    { key: "updated_at", label: "Updated At" },
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 text-xs sm:text-sm">
            Manage your product catalog
          </p>
        </div>
        <button
          onClick={() => setCurrentView("add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
              <input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-xs"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-lg text-xs"
            >
              <option value="all">All Categories</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-lg text-xs"
            >
              <option value="-created_at">Newest First</option>
              <option value="product_name">Name A-Z</option>
              <option value="price">Price Low-High</option>
              <option value="-price">Price High-Low</option>
              <option value="-rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-h-[68vh] overflow-auto hide-scrollbar">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-400 text-gray-500 text-xs uppercase">
            <tr>
              {tableHeaders.map((col) => (
                <th key={col.key} className="px-4 py-4">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product: any) => (
              <tr
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentView("detail");
                }}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  <img
                    src={product.cover_image}
                    alt={product.product_name}
                    className="w-12 h-12 object-cover rounded-lg border"
                  />
                </td>
                <td className="px-5 py-4 font-medium">
                  {product.product_name}
                </td>
                <td className="px-5 py-4">
                  {product.category?.name || "—"}
                </td>
                <td className="px-5 py-4">
                  {product.brand?.name || "—"}
                </td>
                <td className="px-5 py-4 text-gray-700">
                  Rs. {product.price} -{" "}
                  <span className="text-gray-900 font-semibold">
                    Rs. {product.discount_price}
                  </span>
                </td>
                <td className="px-5 py-4">Active</td>
                <td className="px-5 py-4 text-xs">
                  {new Date(product.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-xs">
                  {new Date(product.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="text-gray-600 text-sm">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => setCurrentView("add")}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;

