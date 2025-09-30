"use client";
import React, { useState } from "react";
import { Plus, TreePine } from "lucide-react";
import CategoryForm from "./category-form";
import CategoryDetail from "./category-detail";
import CategoryList from "./category-list";

const AdminCategoriesPage = () => {
  const [currentView, setCurrentView] = useState("list");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const mockCategories = [
    {
      id: "1",
      name: "Electronics",
      parent: null,
      image: "https://via.placeholder.com/300x200/3b82f6/white?text=Electronics",
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-20T14:20:00Z",
      product_count: 45,
      subcategories: ["2", "3", "4"],
    },
    {
      id: "2",
      name: "Smartphones",
      parent: "1",
      parent_name: "Electronics",
      image: "https://via.placeholder.com/300x200/10b981/white?text=Smartphones",
      created_at: "2024-01-10T09:15:00Z",
      updated_at: "2024-01-18T16:45:00Z",
      product_count: 25,
      subcategories: [],
    },
    {
      id: "3",
      name: "Laptops",
      parent: "1",
      parent_name: "Electronics",
      image: "https://via.placeholder.com/300x200/8b5cf6/white?text=Laptops",
      created_at: "2024-01-05T11:20:00Z",
      updated_at: "2024-01-15T13:30:00Z",
      product_count: 15,
      subcategories: [],
    },
    {
      id: "4",
      name: "Tablets",
      parent: "1",
      parent_name: "Electronics",
      image: "https://via.placeholder.com/300x200/f59e0b/white?text=Tablets",
      created_at: "2024-01-01T08:45:00Z",
      updated_at: "2024-01-12T10:15:00Z",
      product_count: 8,
      subcategories: [],
    },
    {
      id: "5",
      name: "Fashion",
      parent: null,
      image: "https://via.placeholder.com/300x200/ec4899/white?text=Fashion",
      created_at: "2024-01-08T12:00:00Z",
      updated_at: "2024-01-22T15:30:00Z",
      product_count: 32,
      subcategories: ["6", "7"],
    },
  ];

  const parentCategories = mockCategories.filter((cat) => !cat.parent);

  const filteredCategories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "created_at":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "product_count":
        return b.product_count - a.product_count;
      default:
        return 0;
    }
  });

  if (currentView === "add") {
    return (
      <CategoryForm
        parentCategories={parentCategories}
        setCurrentView={setCurrentView}
      />
    );
  }

  if (currentView === "edit" && selectedCategory) {
    return (
      <CategoryForm
        category={selectedCategory}
        mode="edit"
        parentCategories={parentCategories}
        setCurrentView={setCurrentView}
      />
    );
  }

  if (currentView === "detail" && selectedCategory) {
    return (
      <CategoryDetail
        category={selectedCategory}
        mockCategories={mockCategories}
        setCurrentView={setCurrentView}
        setSelectedCategory={setSelectedCategory}
      />
    );
  }

  return (
    <CategoryList
      categories={sortedCategories}
      parentCategories={parentCategories}
      setCurrentView={setCurrentView}
      setSelectedCategory={setSelectedCategory}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
};

export default AdminCategoriesPage;
