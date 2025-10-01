// "use client";
// import React, { useState } from "react";
// import ProductList from "./product-list";
// import ProductForm from "./product-form";
// import ProductDetail from "./product-detail";

// const ProductPage = () => {
//   const [currentView, setCurrentView] = useState("list");
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterBy, setFilterBy] = useState("all");  
//   const [sortBy, setSortBy] = useState("created_at");

//   const mockProducts = [
//     {
//       id: "1",
//       product_name: "iPhone 15 Pro",
//       description: "Latest iPhone with advanced features",
//       price: 999.99,
//       discount_price: 899.99,
//       rating: 4.8,
//       category: { id: "1", name: "Smartphones" },
//       brand: { id: "1", name: "Apple" },
//       cover_image: "https://via.placeholder.com/300x300/1f2937/white?text=iPhone+15",
//       created_at: "2024-01-15T10:30:00Z",
//       updated_at: "2024-01-20T14:20:00Z",
//     },
//     {
//       id: "2",
//       product_name: "MacBook Air M2",
//       description: "Powerful laptop with M2 chip",
//       price: 1299.99,
//       discount_price: null,
//       rating: 4.9,
//       category: { id: "2", name: "Laptops" },
//       brand: { id: "1", name: "Apple" },
//       cover_image: "https://via.placeholder.com/300x300/374151/white?text=MacBook+Air",
//       created_at: "2024-01-10T09:15:00Z",
//       updated_at: "2024-01-18T16:45:00Z",
//     },
//   ];

//   const mockCategories = [
//     { id: "1", name: "Smartphones" },
//     { id: "2", name: "Laptops" },
//     { id: "3", name: "Tablets" },
//   ];

//   const mockBrands = [
//     { id: "1", name: "Apple" },
//     { id: "2", name: "Samsung" },
//     { id: "3", name: "Dell" },
//   ];

//   // Filtering products
//   const filteredProducts = mockProducts.filter((product) => {
//     const matchesSearch =
//       product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesFilter =
//       filterBy === "all" ||
//       product.category?.name.toLowerCase() === filterBy.toLowerCase();

//     return matchesSearch && matchesFilter;
//   });

//   // View Handling
//   if (currentView === "add") {
//     return (
//       <ProductForm
//         mode="add"
//         setCurrentView={setCurrentView}
//         mockCategories={mockCategories}
//         mockBrands={mockBrands}
//       />
//     );
//   }

//   if (currentView === "edit" && selectedProduct) {
//     return (
//       <ProductForm
//         product={selectedProduct}
//         mode="edit"
//         setCurrentView={setCurrentView}
//         mockCategories={mockCategories}
//         mockBrands={mockBrands}
//       />
//     );
//   }

//   if (currentView === "detail" && selectedProduct) {
//     return (
//       <ProductDetail
//         product={selectedProduct}
//         setCurrentView={setCurrentView}
//         setSelectedProduct={setSelectedProduct}
//       />
//     );
//   }

//   return (
//     <ProductList
//       products={filteredProducts}
//       setCurrentView={setCurrentView}
//       setSelectedProduct={setSelectedProduct}
//       searchTerm={searchTerm}
//       setSearchTerm={setSearchTerm}
//       filterBy={filterBy}
//       setFilterBy={setFilterBy}
//       sortBy={sortBy}
//       setSortBy={setSortBy}
//     />
//   );
// };

// export default ProductPage;


"use client";
import React, { useState } from "react";
import ProductList from "./product-list";
import ProductForm from "./product-form";
import ProductDetail from "./product-detail";

const ProductPage = () => {
  const [currentView, setCurrentView] = useState<"list" | "add" | "edit" | "detail">("list");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  if (currentView === "list") {
    return (
      <ProductList
        setCurrentView={setCurrentView as (view: string) => void}
        setSelectedProduct={setSelectedProduct}
      />

    );
  }

  if (currentView === "add") {
    return (
      <ProductForm
        mode="add"
        setCurrentView={setCurrentView as (view: string) => void}
      />

    );
  }

  if (currentView === "edit" && selectedProduct) {
    return (
      <ProductForm
        mode="edit"
        product={selectedProduct}
        setCurrentView={setCurrentView as (view: string) => void}
      />
    );
  }

  if (currentView === "detail" && selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        setCurrentView={setCurrentView as (view: string) => void}
        setSelectedProduct={setSelectedProduct}
      />
    );
  }

  return null;
};

export default ProductPage;
