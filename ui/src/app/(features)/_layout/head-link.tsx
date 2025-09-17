"use client";
import Link from "next/link";
import { List } from "lucide-react";
import { useCategories } from "@/api/category";

export const HeadLink = () => {
  const { data: categories = [], isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <header className="border-b border-accent">
        <div className="px-2 md:px-4 py-4 max-w-6xl mx-auto text-sm text-gray-500">
          Loading categories...
        </div>
      </header>
    );
  }

  if (isError || !categories.length) {
    return (
      <header className="border-b border-accent">
        <div className="px-2 md:px-4 py-4 max-w-6xl mx-auto text-sm text-gray-500">
          No categories available
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-accent">
      <div className="flex items-center gap-6 px-2 md:px-4 py-4 max-w-6xl mx-auto text-sm text-gray-700 overflow-x-scroll whitespace-nowrap hide-scrollbar">
        <Link
          href="/products/all"
          className="flex items-center gap-1 hover:text-gray-500 transition-colors"
        >
          <List className="w-4 h-4" strokeWidth={2} />
          <span>All Categories</span>
        </Link>

        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products/${cat.name}`}
            className="flex items-center gap-1 hover:text-gray-500 transition-colors"
          >
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </header>

  );
};