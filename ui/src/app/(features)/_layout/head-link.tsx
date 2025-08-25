"use client";
import Link from "next/link";
import { List } from "lucide-react";

interface NavItem {
  label: string;
  url: string;
}

export const navItems: NavItem[] = [
  { label: "All Categories", url: "/" },
  { label: "Electronics", url: "/" },
  { label: "Fashion", url: "/" },
  { label: "Women’s", url: "/" },
  { label: "Kids’ Fashion", url: "/" },
  { label: "Healthy & Beauty", url: "/" },
  { label: "Pharmacy", url: "/" },
  { label: "Groceries", url: "/" },
  { label: "Luxury Item", url: "/" },
];

export const HeadLink = () => {
  return (
    <header className="border-b border-accent">
      <div className="flex items-center gap-6 px-2 md:px-4 py-4 max-w-6xl mx-auto text-sm text-gray-700 overflow-x-scroll whitespace-nowrap hide-scrollbar">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="flex items-center gap-1 hover:text-gray-500 transition-colors"
          >
            {item.label === "All Categories" && (
              <List className="w-4 h-4" strokeWidth={2} />
            )}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </header>
  );
};
