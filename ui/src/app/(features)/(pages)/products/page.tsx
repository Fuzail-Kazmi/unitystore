'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Grid3X3, 
  List, 
  Heart, 
  Star, 
  ShoppingCart, 
  Eye,
  X,
  SlidersHorizontal,
  UserRound
} from 'lucide-react';

const ProductPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  type FilterType = {
    category: string[];
    priceRange: [number, number];
    rating: number;
    brand: string[];
    inStock: boolean;
  };

  const [filters, setFilters] = useState<FilterType>({
    category: [],
    priceRange: [0, 1000],
    rating: 0,
    brand: [],
    inStock: false
  });

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      brand: "TechSound",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 245,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Electronics",
      inStock: true,
      features: ["Noise Canceling", "40H Battery", "Quick Charge"]
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      brand: "EcoWear",
      price: 45,
      originalPrice: null,
      rating: 4.5,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "Fashion",
      inStock: true,
      features: ["100% Organic", "Fair Trade", "Soft Feel"]
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      brand: "FitTech",
      price: 199,
      originalPrice: 249,
      rating: 4.6,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Electronics",
      inStock: false,
      features: ["Heart Rate", "GPS", "Waterproof"]
    },
    {
      id: 4,
      name: "Minimalist Backpack",
      brand: "UrbanCarry",
      price: 89,
      originalPrice: null,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "Fashion",
      inStock: true,
      features: ["Water Resistant", "Laptop Pocket", "Ergonomic"]
    },
    {
      id: 5,
      name: "Skincare Gift Set",
      brand: "BrewMaster",
      price: 89,
      originalPrice: 120,
      rating: 4.3,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
      category: "Healthy & Beauty",
      inStock: true,
      features: ["Natural Ingredients", "Gift Box", "All Skin Types"]
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      brand: "PowerFlow",
      price: 59,
      originalPrice: null,
      rating: 4.4,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      category: "Electronics",
      inStock: true,
      features: ["Fast Charging", "LED Indicator", "Universal"]
    },
    {
      id: 7,
      name: "Women's Designer Dress",
      brand: "EcoWear",
      price: 129,
      originalPrice: 179,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      category: "Women's",
      inStock: true,
      features: ["Premium Fabric", "Comfortable Fit", "Elegant Design"]
    },
    {
      id: 8,
      name: "Kids Colorful Sneakers",
      brand: "FitTech",
      price: 79,
      originalPrice: null,
      rating: 4.5,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=400&fit=crop",
      category: "Kids' Fashion",
      inStock: true,
      features: ["Comfortable", "Durable", "Fun Colors"]
    }
  ];

  const categories = ["Electronics", "Fashion", "Women's", "Kids' Fashion", "Healthy & Beauty", "Pharmacy", "Groceries", "Luxury Item"];
  const brands = ["TechSound", "EcoWear", "FitTech", "UrbanCarry", "BrewMaster", "PowerFlow"];

  const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [cartCount] = useState(2);

    return (
      <>
        <header className='border-b border-gray-200 sticky top-0 z-50 bg-white'>
          <div className="flex items-center justify-between max-w-6xl mx-auto py-2 px-2 md:py-4 md:px-4">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <div className="text-blue-600 font-bold text-lg md:text-xl">UnityStore</div>
              </div>
            </Link>

            <div className='flex items-center gap-2 md:gap-4'>
              <div className='hidden sm:flex items-center justify-between border border-gray-200 rounded-xl p-2 text-sm w-48 sm:w-80 lg:w-96'>
                <input
                  type="text"
                  placeholder='Search products...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400'
                />
                <button className='text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0'>
                  <Search className='h-4 w-4' />
                </button>
              </div>
              
              <div className='hidden sm:flex items-center gap-2 md:gap-3'>
                <Link href='/cart' className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative cursor-pointer'>
                  <ShoppingCart className='h-4 md:h-5 md:w-5 w-4' />
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]'>
                    {cartCount}
                  </span>
                </Link>

                <div className='flex items-center gap-2'>
                  <button className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer'>
                    <UserRound className='h-4 md:h-5 md:w-5 w-4' />
                  </button>
                  <div>
                    <p className='text-xs text-gray-500'>Hello</p>
                    <p className='text-sm text-gray-700 font-medium'>Sign in</p>
                  </div>
                </div>
              </div>
              
              <div className='flex sm:hidden items-center gap-2'>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors'
                >
                  <Search className='h-4 w-4' />
                </button>

                <button className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative'>
                  <ShoppingCart className='h-4 w-4' />
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]'>
                    {cartCount}
                  </span>
                </button>

                <button className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors'>
                  <UserRound className='h-4 w-4' />
                </button>
              </div>
            </div>
          </div>
          
          {isSearchOpen && (
            <div className='sm:hidden border-t border-gray-200 bg-white'>
              <div className='max-w-6xl mx-auto px-3 py-3'>
                <div className='flex items-center justify-between border border-gray-200 rounded-lg p-2'>
                  <input
                    type="text"
                    placeholder='Search products...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400'
                    autoFocus
                  />
                  <button className='text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0'>
                    <Search className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>
        
        {isSearchOpen && (
          <div
            className="fixed inset-0 bg-black/40 bg-opacity-25 z-40 sm:hidden"
            onClick={() => setIsSearchOpen(false)}
          />
        )}
      </>
    );
  };

  // Navigation Links Component
  const navItems = [
    { label: "All Categories", url: "/" },
    { label: "Electronics", url: "/products?category=Electronics" },
    { label: "Fashion", url: "/products?category=Fashion" },
    { label: "Women's", url: "/products?category=Women's" },
    { label: "Kids' Fashion", url: "/products?category=Kids' Fashion" },
    { label: "Healthy & Beauty", url: "/products?category=Healthy & Beauty" },
    { label: "Pharmacy", url: "/products?category=Pharmacy" },
    { label: "Groceries", url: "/products?category=Groceries" },
    { label: "Luxury Item", url: "/products?category=Luxury Item" },
  ];

  const HeaderLinks = () => (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center gap-6 px-2 md:px-4 py-4 max-w-6xl mx-auto text-sm text-gray-700 overflow-x-scroll whitespace-nowrap scrollbar-hide">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors font-medium"
          >
            {item.label === "All Categories" && (
              <List className="w-4 h-4" strokeWidth={2} />
            )}
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );

  // Types
  type FilterKey = 'category' | 'brand';
  type ProductType = {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    reviews: number;
    image: string;
    category: string;
    inStock: boolean;
    features: string[];
  };

  // Filter toggle function
  const toggleFilter = (type: FilterKey, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item: string) => item !== value)
        : [...prev[type], value]
    }));
  };

  // Clear filters function
  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 1000],
      rating: 0,
      brand: [],
      inStock: false
    });
  };

  // Filtered products
  const filteredProducts: ProductType[] = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category);
    const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesRating = product.rating >= filters.rating;
    const matchesStock = !filters.inStock || product.inStock;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock;
  });

  // Product card
  const ProductCard = ({ product }: { product: ProductType }) => (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-700" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Eye className="h-4 w-4 text-gray-700" />
          </button>
        </div>
        {product.originalPrice && (
          <div className="absolute top-4 left-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        {product.features.slice(0, 2).map((feature: string, index: number) => (
          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {feature}
          </span>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
      
      <div className="flex items-center gap-1 mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-1">
          {product.rating} ({product.reviews})
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {product.features.slice(0, 2).map((feature: string, index: number) => (
          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {feature}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
        <button 
          disabled={!product.inStock}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium"
        >
          <ShoppingCart className="h-4 w-4" />
          Add
        </button>
      </div>
    </div>
  );

  // Sidebar
  const Sidebar = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button 
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => toggleFilter('category', category)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-sm">
                {category}
              </span>
              <span className="text-sm text-gray-400 ml-auto">
                ({products.filter(p => p.category === category).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
              }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <span className="text-gray-400">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                priceRange: [prev.priceRange[0], parseInt(e.target.value) || 1000]
              }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => setFilters(prev => ({ ...prev, rating }))}
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Brands</h3>
        <div className="space-y-3">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => toggleFilter('brand', brand)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-sm">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Availability</h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={() => setFilters(prev => ({ ...prev, inStock: !prev.inStock }))}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-sm">
            In Stock Only
          </span>
        </label>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>
              </div>

              {/* Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-2">
                  {/* Mobile Filter Button */}
                  <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                  </button>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>

                  {/* View Toggle */}
                  <div className="hidden sm:flex border border-gray-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                    >
                      <Grid3X3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-xl border border-gray-300 font-medium transition-colors">
                  Load More Products
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;