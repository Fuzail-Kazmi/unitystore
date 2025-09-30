"use client";
import { Plus, Search, TreePine } from "lucide-react";
import React from "react";

interface Props {
    categories: any[];
    parentCategories: any[];
    setCurrentView: (v: "list" | "add" | "edit" | "detail") => void;
    setSelectedCategory: (c: any) => void;
    searchTerm: string;
    setSearchTerm: (v: string) => void;
    sortBy: string;
    setSortBy: (v: string) => void;
}

  const categoryTableHeaders = [
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "parent", label: "Parent" },
    { key: "created_at", label: "Created At" },
    { key: "updated_at", label: "Updated At" },
  ];

const CategoryList = ({
    categories,
    parentCategories,
    setCurrentView,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
}: Props) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-600 text-xs sm:text-sm">Organize your products with categories</p>
                </div>
                <button
                    onClick={() => setCurrentView('add')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-xs"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add Category
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
                                placeholder="Search categories..."
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

            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-600">{parentCategories.length}</p>
                        <p className="text-sm text-gray-600">Main Categories</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-600">
                            {categories.filter(cat => cat.parent).length}
                        </p>
                        <p className="text-sm text-gray-600">Subcategories</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-600">{categories.length}</p>
                        <p className="text-sm text-gray-600">Total Categories</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-600">
                            {categories.reduce((sum, cat) => sum + cat.product_count, 0)}
                        </p>
                        <p className="text-sm text-gray-600">Total Products</p>
                    </div>
                </div>
            </div>

            {/* <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-sm"
                        onClick={() => {
                            setSelectedCategory(cat);
                            setCurrentView("detail");
                        }}
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{cat.name}</h2>
                            <p className="text-sm text-gray-600">{cat.product_count} products</p>
                            {cat.parent_name && (
                                <p className="text-xs text-gray-500">Parent: {cat.parent_name}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div> */}

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-h-[55vh] h-[55vh] overflow-y-auto hide-scrollbar">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 border-b border-gray-400 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                            {categoryTableHeaders.map((cat) => (
                                <th key={cat.key} className="px-4 py-4 text-left">
                                    {cat.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 border-gray-900">
                        {categories.map((cat) => (
                            <tr
                                key={cat.id}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setCurrentView("detail");
                                }}
                            >
                                <td className="px-4 py-2">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-14 h-12 object-cover rounded border border-gray-200"
                                    />
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900">{cat.name}</td>
                                <td className="px-4 py-2 text-gray-600">
                                    {cat.parent_name || "-"}
                                </td>
                                <td className="px-4 py-2 text-gray-600 text-xs">
                                    {new Date(cat.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 text-gray-600 text-xs">
                                    {new Date(cat.updated_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}

                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={categoryTableHeaders.length} className="justify-center text-center py-12">
                                    <TreePine className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                        No categories found
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Try adjusting your search criteria
                                    </p>
                                    <button
                                        onClick={() => setCurrentView("add")}
                                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-colors cursor-pointer text-sm"
                                    >
                                        <Plus className="w-4 h-4" /> Add First Category
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


export default CategoryList;
