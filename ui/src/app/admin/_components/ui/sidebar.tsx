import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/index";
import Link from "next/link";
import {
  Package,
  MapPin,
  UserRound,
  LogOut,
  LayoutDashboardIcon,
  Layers,
  Tags,
  Boxes,
} from "lucide-react";

const AdminSidebar = () => {
  const { handleLogout } = useAuth();
  const pathname = usePathname();

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon, href: "/admin" },
    { id: "orders", label: "Orders", icon: Boxes, href: "/admin/orders" },
    { id: "products", label: "Products", icon: Package, href: "/admin/products" },
    { id: "brands", label: "Brands", icon: Tags, href: "/admin/brands" },
    { id: "category", label: "Category", icon: Layers, href: "/admin/category" },
    { id: "logout", label: "Logout", icon: LogOut, action: handleLogout },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b border-gray-200 opacity-0">
        <img src="/logo.png" className="h-7 w-7" />
        <span className="font-semibold text-gray-800">Admin Panel</span>
      </div>
      <div className="flex items-center gap-2 p-4 border-b border-gray-300 my-2">
        <img src="/logo.png" className="h-8 w-8" />
        <span className="font-semibold text-gray-800">Admin Panel</span>
      </div>
      <nav className="overflow-y-auto hide-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          if (tab.id === "logout") {
            return (
              <button
                key={tab.id}
                onClick={tab.action}
                className="flex items-center space-x-2 px-4 py-3 w-full text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={tab.id}
              href={tab.href!}
              className={`flex items-center space-x-2 px-4 py-4 text-sm font-medium transition-colors 
                ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
