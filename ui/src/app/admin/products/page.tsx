"use client";
import React, { useState } from 'react';
import {
  Plus, Search, Edit, Trash2, Eye, Package,
  Filter, ArrowUpDown, Star, ChevronLeft, Save, Upload,
  MoreVertical, Calendar, DollarSign
} from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');

  const mockProducts = [
    {
      id: '1',
      product_name: 'iPhone 15 Pro',
      description: 'Latest iPhone with advanced features',
      price: 999.99,
      discount_price: 899.99,
      rating: 4.8,
      category: { id: '1', name: 'Smartphones' },
      brand: { id: '1', name: 'Apple' },
      cover_image: 'https://via.placeholder.com/300x300/1f2937/white?text=iPhone+15',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-20T14:20:00Z'
    },
    {
      id: '2',
      product_name: 'MacBook Air M2',
      description: 'Powerful laptop with M2 chip',
      price: 1299.99,
      discount_price: null,
      rating: 4.9,
      category: { id: '2', name: 'Laptops' },
      brand: { id: '1', name: 'Apple' },
      cover_image: 'https://via.placeholder.com/300x300/374151/white?text=MacBook+Air',
      created_at: '2024-01-10T09:15:00Z',
      updated_at: '2024-01-18T16:45:00Z'
    }
  ];

  const mockCategories = [
    { id: '1', name: 'Smartphones' },
    { id: '2', name: 'Laptops' },
    { id: '3', name: 'Tablets' }
  ];

  const mockBrands = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Samsung' },
    { id: '3', name: 'Dell' }
  ];

  // Product Form Component
  const ProductForm = ({ product, mode = 'add' }) => {
    const [formData, setFormData] = useState({
      product_name: product?.product_name || '',
      description: product?.description || '',
      price: product?.price || '',
      discount_price: product?.discount_price || '',
      category: product?.category?.id || '',
      brand: product?.brand?.id || '',
      cover_image: null
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          cover_image: file
        }));
      }
    };

    const validateForm = () => {
      const newErrors = {};
      if (!formData.product_name.trim()) newErrors.product_name = 'Product name is required';
      if (!formData.price) newErrors.price = 'Price is required';
      if (formData.price && isNaN(formData.price)) newErrors.price = 'Price must be a number';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Submitting product:', formData);
        alert(`Product ${mode === 'add' ? 'added' : 'updated'} successfully!`);
        setCurrentView('list');
      } catch (error) {
        console.error('Error submitting product:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('list')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Products
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === 'add' ? 'Add New Product' : `Edit Product`}
            </h1>
          </div>
        </div>

        <div className="max-w-6xl space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.product_name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Enter product name"
                />
                {errors.product_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.product_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {mockCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Brand</option>
                  {mockBrands.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.price ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="0.00"
                  step="0.01"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Price
                </label>
                <input
                  type="number"
                  name="discount_price"
                  value={formData.discount_price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product description"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image
                </label>
                <div className="flex items-center space-x-4">
                  {product?.cover_image && (
                    <img
                      src={product.cover_image}
                      alt="Current cover"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="w-4 h-4" />
                    Upload Cover Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              onClick={() => setCurrentView('list')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {mode === 'add' ? 'Add Product' : 'Update Product'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Product Detail Component
  const ProductDetail = ({ product }) => {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('list')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Products
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{product.product_name}</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedProduct(product);
                setCurrentView('edit');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
              <div className="space-y-4">
                <img
                  src={product.cover_image}
                  alt={product.product_name}
                  className="w-full aspect-square object-cover rounded-lg border"
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Category</label>
                    <p className="text-gray-900">{product.category?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Brand</label>
                    <p className="text-gray-900">{product.brand?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Price</label>
                    <p className="text-gray-900 font-semibold">Rs. {product.price}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Discount Price</label>
                    <p className="text-gray-900 font-semibold">
                      {product.discount_price ? `Rs. ${product.discount_price}` : 'N/A'}
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
                  <p className="text-gray-900 mt-1">{product.description || 'No description available'}</p>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-white rounded-lg border p-6">
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

  // Filter products based on search and filters
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterBy === 'all' ||
      product.category?.name.toLowerCase() === filterBy.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // Render based on current view
  if (currentView === 'add') {
    return <ProductForm mode="add" />;
  }

  if (currentView === 'edit' && selectedProduct) {
    return <ProductForm product={selectedProduct} mode="edit" />;
  }

  if (currentView === 'detail' && selectedProduct) {
    return <ProductDetail product={selectedProduct} />;
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

  // Products List View
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setCurrentView('add')}
          className="flex items-center gap-2 bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Product
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5  h-3.5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-0 focus:ring-0 focus:border-0 text-xs"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer text-xs"
            >
              <option value="all">All Categories</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="tablets">Tablets</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer text-xs"
            >
              <option value="created_at">Newest First</option>
              <option value="product_name">Name A-Z</option>
              <option value="price">Price Low-High</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Tabel */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-auto hide-scrollbar">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-400 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              {tableHeaders.map((col) => (
                <th key={col.key} className="px-4 py-4">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-gray-900">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentView("detail");
                }}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-4">
                  <img
                    src={product.cover_image}
                    alt={product.product_name}
                    className="w-12 h-12 object-cover rounded-lg border"
                  />
                </td>
                <td className="px-5 py-4 font-medium text-gray-900">
                  {product.product_name}
                </td>
                <td className="px-5 py-4">{product.category?.name || "—"}</td>
                <td className="px-5 py-4">{product.brand?.name || "—"}</td>
                <td className="px-5 py-4">
                  {product.discount_price ? (
                    <div className="space-x-1">
                      <span className="line-through text-gray-400">
                        Rs. {product.price}
                      </span>
                      <span className="font-semibold text-gray-900">
                        Rs. {product.discount_price}
                      </span>
                    </div>
                  ) : (
                    <span className="font-semibold text-gray-900">
                      Rs. {product.price}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4">
                  {product.active ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-gray-500 text-xs">
                  {new Date(product.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-gray-500 text-xs">
                  {new Date(product.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No products found
            </h3>
            <p className="text-gray-600 mb-5 text-sm">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => setCurrentView("add")}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-colors cursor-pointer text-sm"
            >
              <Plus className="w-4 h-4" />
              Add First Product
            </button>
          </div>
        )}
      </div>

    </div >



  );
};

export default Index;