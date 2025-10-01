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
