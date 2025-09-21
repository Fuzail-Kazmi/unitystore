'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Grid3X3,
  List,
  Heart,
  Star,
  X,
  SlidersHorizontal,
} from 'lucide-react';

import { useProductsList } from "@/api/product";
import { useCategories } from "@/api/category";
import { useBrandsList } from "@/api/brand";
import AddToCartButton from '@/components/products/AddToCartButton';

const ProductPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const { data } = useProductsList();
  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrandsList();

  type ProductType = {
    id: string;
    brand: string;
    product_name: string;
    final_price: number;
    price: number | null;
    rating: number;
    reviews: number;
    cover_image: string;
    category: string;
    inStock: boolean;
  };

  const products: ProductType[] = (data?.results || []).map((product: any) => ({
    id: product.id,
    product_name: product.product_name,
    brand: product.brand ? product.brand.id : "Unknown",
    category: product.category ? product.category.id : "Uncategorized",
    final_price: Number(product.final_price),
    price: product.price,
    cover_image: product.cover_image,
    rating: product.rating ?? 5,
    reviews: product.reviews_count ?? 0,
    inStock: product.in_stock ?? true,
  }));


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

  const categories = categoriesData?.map((c: { id: string; name: string }) => ({ id: c.id, name: c.name })) || [];
  const brands = brandsData?.map((b: { id: string; name: string }) => ({ id: b.id, name: b.name })) || [];

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 4);
  const visibleBrands = showAllBrands ? brands : brands.slice(0, 4);

  type FilterKey = 'category' | 'brand';

  const toggleFilter = (type: FilterKey, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item: string) => item !== value)
        : [...prev[type], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 1000],
      rating: 0,
      brand: [],
      inStock: false
    });
  };

  const filteredProducts: ProductType[] = products.filter((p) => {
    const matchesCategory = filters.category.length === 0 || filters.category.includes(p.category);
    const matchesBrand = filters.brand.length === 0 || filters.brand.includes(p.brand);
    const matchesPrice = Number(p.price) >= filters.priceRange[0] && Number(p.price) <= filters.priceRange[1];
    const matchesRating = p.rating >= filters.rating;
    const matchesStock = !filters.inStock || p.inStock;

    return (
      matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock
    );

  });


  console.log("API DATA ===>", data);
  console.log("Mapped Products ===>", products);
  console.log("Filtered Products ===>", filteredProducts);

  const ProductCard = ({ product }: { product: ProductType }) => (
    <Link
      href={`/products/${product.id}`}
      key={product.id}
    >
      {viewMode === 'grid' ? (
        <>
          <div className="group bg-white/85 rounded-lg  hover:shadow-sm transition-all duration-200 overflow-hidden border border-gray-100 sm:h-90"
          >
            <div className="relative overflow-hidden sm:max-h-[65%]">
              <img
                src={product.cover_image}
                alt={product.product_name}
                className="bg-white/50 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors cursor-pointer">
                  <Heart className="h-4 w-4 text-gray-700" />
                </button>
              </div>
              {product.price && (
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    -{Math.round(((product.price - product.final_price) / product.price) * 100)}%
                  </span>
                </div>
              )}
            </div>
            <div className='sm:h-[35%] p-2 flex flex-col justify-between gap-2'>
              <div className='space-y-1'>
                <h4 className="text-sm md:text-base text-gray-700 max-h-12 text-ellipsis overflow-hidden">
                  {product.product_name}
                </h4>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="flex items-center gap-1 text-xs text-gray-600 ml-1">
                  <span>
                    {product.rating}
                  </span>
                  <span className='hidden sm:block'>
                    ({product.reviews})
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-gray-900">${product.final_price}</span>
                  {product.price && (
                    <span className="text-gray-400 line-through text-xs">${product.price}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex group bg-white/85 rounded-lg  hover:shadow-sm transition-all duration-200 overflow-hidden border border-gray-100 sm:h-50 w-full">
            <div className="relative overflow-hidden w-[25%]">
              <img
                src={product.cover_image}
                alt={product.product_name}
                className="bg-white/50 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors cursor-pointer">
                  <Heart className="h-4 w-4 text-gray-700" />
                </button>
              </div>
              {product.price && (
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    -{Math.round(((product.price - product.final_price) / product.price) * 100)}%
                  </span>
                </div>
              )}

            </div>
            <div className='p-2 flex flex-col justify-between gap-2 w-[75%]'>
              <div className='space-y-2'>
                <h4 className="text-base md:text-lg text-gray-700 max-h-18 text-ellipsis overflow-hidden">
                  {product.product_name}
                </h4>
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs md:text-sm text-gray-600 ml-1">
                    <span>
                      {product.rating}
                    </span>
                    <span className='hidden sm:block'>
                      ({product.reviews})
                    </span>
                  </span>
                </div>


                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">${product.final_price}</span>
                    {product.price && (
                      <span className="text-gray-400 line-through text-xs sm:text-base">${product.price}</span>
                    )}
                  </div>
                </div>
              </div>

              <AddToCartButton
                productId={product.id}
                productName={product.product_name}
              />
            </div>
          </div>
        </>
      )}
    </Link >
  );

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

      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {visibleCategories.map(cat => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category.includes(cat.id)}
                onChange={() => toggleFilter('category', cat.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-sm">
                {cat.name}
              </span>
              <span className="text-sm text-gray-400 ml-auto">
                ({products.filter(p => p.category === cat.id).length})
              </span>
            </label>
          ))}
        </div>

        {categories.length > 5 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            {showAllCategories ? "Show Less" : "Load More"}
          </button>
        )}
      </div>
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

      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Brands</h3>
        <div className="space-y-3">
          {visibleBrands.map(brand => (
            <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand.id)}
                onChange={() => toggleFilter('brand', brand.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-sm">
                {brand.name}
              </span>
            </label>
          ))}
        </div>

        {brands.length > 5 && (
          <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            {showAllBrands ? "Show Less" : "Load More"}
          </button>
        )}
      </div>

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

    <div className="max-w-6xl mx-auto">
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

      <div className="max-w-6xl mx-auto px-2 md:px-4 py-4">
        <div className="flex gap-4">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <Sidebar />
          </aside>

          <main className="flex-1">
            <div className="mb-2">
              <div className="flex flex-col justify-end sm:flex-row gap-4 mb-6">
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    Filters
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>

                  <div className="hidden sm:flex border border-gray-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-2  cursor-pointer ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-2  cursor-pointer ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`grid gap-4 ${viewMode === 'grid'
              ? 'grid-cols-2 sm:grid-cols-3'
              : 'grid-cols-1'
              }`}>

              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="bg-primary hover:bg-primary/95 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white hover:bg-gray-50 text-gray-900 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-lg border border-gray-300 font-medium transition-colors cursor-pointer">
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



export default ProductPage