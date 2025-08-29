"use client";
import Link from "next/link";
import { List } from "lucide-react";

interface NavItem {
  category: string;
}

export const navItems: NavItem[] = [
  { category: "All Categories" },
  { category: "Electronics" },
  { category: "Fashion", },
  { category: "Women’s" },
  { category: "Kids’ Fashion" },
  { category: "Healthy & Beauty" },
  { category: "Pharmacy" },
  { category: "Groceries" },
  { category: "Luxury Item" },
];

export const HeadLink = () => {
  return (
    <header className="border-b border-accent">
      <div className="flex items-center gap-6 px-2 md:px-4 py-4 max-w-6xl mx-auto text-sm text-gray-700 overflow-x-scroll whitespace-nowrap hide-scrollbar">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={`/products/${item.category}`}
            className="flex items-center gap-1 hover:text-gray-500 transition-colors"
          >
            {item.category === "All Categories" && (
              <List className="w-4 h-4" strokeWidth={2} />
            )}
            <span>{item.category}</span>
          </Link>
        ))}
      </div>
    </header>
  );
};
