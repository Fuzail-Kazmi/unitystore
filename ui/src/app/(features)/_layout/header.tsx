// "use client";

// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import { ChevronDown, LogOut, Search, ShoppingCart, UserRound } from "lucide-react";
// import { useRouter } from "next/navigation";

// import { useAuth } from "@/hooks/index";
// import { useCart } from "@/hooks/useCart";
// import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

// export const Header = () => {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const router = useRouter();

//   const { isAuthenticated, user, handleLogout } = useAuth();
//   const { cart } = useCart();


//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }

//     if (dropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownOpen]);

//   return (
//     <>
//       <header className="border-b border-accent sticky top-0 z-50 bg-white">
//         <div className="flex items-center justify-between max-w-6xl mx-auto px-2 md:px-4 py-2">
//           <Link href="/" className="flex-shrink-0">
//             <div className="h-15 md:h-20 flex items-center">
//               <img
//                 src="/cover-logo.png"
//                 alt="Al Hameed Computers"
//                 className="h-full w-auto object-contain"
//               />
//             </div>
//           </Link>

//           <div className="flex items-center gap-2 md:gap-4">
//             <Searchbar />

//             <div className="hidden sm:flex items-center gap-2 md:gap-3">
//               <Link
//                 href="/cart"
//                 className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative cursor-pointer"
//               >
//                 <ShoppingCart className="h-4 md:h-5 md:w-5 w-4" />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
//                     {cart.length}
//                   </span>
//                 )}
//               </Link>

//               <div className="relative">
//                 <div className="flex gap-2 items-center">
//                   <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer">
//                     <UserRound className="h-4 md:h-5 md:w-5 w-4" />
//                   </button>
//                   <div>
//                     <p className="text-xs text-gray-500">Hello</p>
//                     <div
//                       className="relative cursor-pointer"
//                       onClick={() =>
//                         isAuthenticated ? setDropdownOpen(!dropdownOpen) : router.push("/login")
//                       }
//                     >
//                       {isAuthenticated && user ? (
//                         <span className="text-sm font-medium text-gray-700 flex relative">
//                           {user.username}
//                           <div className="absolute right-[-15] top-1"
//                           >
//                             <ChevronDown className="h-3.5 w-3.5" />
//                           </div>
//                         </span>
//                       ) : (
//                         <span className="text-sm font-medium text-gray-700">
//                           Sign in
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 {dropdownOpen && isAuthenticated && (
//                   <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                     <ul className="text-sm text-gray-700">
//                       <li>
//                         <Link
//                           href="/profile"
//                           className="block px-4 py-2 hover:bg-gray-100"
//                         >
//                           My Profile
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/orders"
//                           className="block px-4 py-2 hover:bg-gray-100"
//                         >
//                           My Orders
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/reviews"
//                           className="block px-4 py-2 hover:bg-gray-100"
//                         >
//                           My Reviews
//                         </Link>
//                       </li>
//                       <li className="border-t border-accent">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 items-center flex gap-2 cursor-pointer"
//                         >
//                           <LogOut className="h-4 w-4" />
//                           Logout
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex sm:hidden items-center gap-2">
//               <button
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
//               >
//                 <Search className="h-4 w-4" />
//               </button>
//               <Link
//                 href="/cart"
//                 className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative"
//               >
//                 <ShoppingCart className="h-4 w-4" />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
//                     {cart.length}
//                   </span>
//                 )}
//               </Link>

//               <button
//                 onClick={() =>
//                   isAuthenticated ? setDropdownOpen(!dropdownOpen) : router.push("/login")
//                 }
//                 className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
//               >
//                 <UserRound className="h-4 w-4" />
//               </button>

//               {dropdownOpen && isAuthenticated && (
//                 <div className="absolute right-2 top-12 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                   <ul className="text-sm text-gray-700">
//                     <li>
//                       <Link
//                         href="/orders"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         My Orders
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/reviews"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         My Reviews
//                       </Link>
//                     </li>
//                     <li className="border-t border-accent">
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 items-center flex gap-2 cursor-pointer"
//                       >
//                         <LogOut className="h-4 w-4" />
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {isSearchOpen && (
//           <div className="sm:hidden border-t border-accent bg-white w-full">
//             <div className="max-w-6xl mx-auto px-2 py-3">
//               <MobileSearchbar/>
//             </div>
//           </div>
//         )}
//       </header>

//       {isSearchOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 bg-opacity-25 z-40 sm:hidden"
//           onClick={() => {
//             setIsSearchOpen(false);
//           }}
//         ></div>
//       )}
//     </>
//   );
// };

// const Searchbar = () => {
//   const results = [
//     'MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card',
//     'MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card fafasfaf fafa ',
//     'MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card fafasfaf fafa ',
//     'MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Cardwdadadasda ',
//     'MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card',
//   ]
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <div className="hidden sm:flex items-center justify-between border border-accent rounded-xl p-2 text-sm w-48 sm:w-80 lg:w-140 relative">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400"
//           />
//           <button className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0">
//             <Search className="h-4 w-4" />
//           </button>
//         </div>
//       </PopoverTrigger>
//       <PopoverContent>
//         <ul className="bg-white hidden sm:block sm:w-77 lg:w-137 rounded-b-lg overflow-hidden">
//           {results.map((r, i) => {
//             return (
//               <li key={i} className="hover:bg-gray-100 py-2 cursor-pointer px-2 max-h-12 whitespace-nowrap overflow-hidden text-ellipsis text-sm font-normal">
//                 <Link href={`/products`}>{r}</Link>
//               </li>
//             )
//           })
//           }
//         </ul>
//       </PopoverContent>
//     </Popover>
//   )
// }

// const MobileSearchbar = () => {
//   const results = [
//     'MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card',
//     'MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card fafasfaf fafa ',
//     'MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card fafasfaf fafa ',
//     'MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Cardwdadadasda ',
//     'MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card',
//   ]
//   return (
//     <Popover >
//       <PopoverTrigger asChild>
//         <div className="flex items-center justify-between border border-accent rounded-lg p-2">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400"
//             autoFocus
//           />
//           <button className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0">
//             <Search className="h-4 w-4" />
//           </button>
//         </div>
//       </PopoverTrigger>
//       <PopoverContent>
//         <ul className="bg-red-300 min-w-80 max-w-147 mx-2 rounded-b-lg">
//           {results.map((r, i) => {
//             return (
//               <li key={i} className="hover:bg-gray-100 py-2 cursor-pointer px-2 max-h-12 whitespace-nowrap overflow-hidden text-ellipsis text-xs font-normal">
//                 <Link href={`/products`}>{r}</Link>
//               </li>
//             )
//           })
//           }
//         </ul>
//       </PopoverContent>
//     </Popover>
// )
// }


// this is the apply number 2 
// "use client";

// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import {
//   ChevronDown,
//   LogOut,
//   Search,
//   ShoppingCart,
//   UserRound,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/hooks/index";
// import { useCart } from "@/hooks/useCart";
// import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
// import { useQuery } from "@tanstack/react-query";
// import axiosClient from "@/_api/axiosClient";

// export const Header = () => {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const router = useRouter();

//   const { isAuthenticated, user, handleLogout } = useAuth();
//   const { cart } = useCart();

//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     }

//     if (dropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownOpen]);

//   return (
//     <>
//       <header className="border-b border-accent sticky top-0 z-50 bg-white">
//         <div className="flex items-center justify-between max-w-6xl mx-auto px-2 md:px-4 py-2">
//           <Link href="/" className="flex-shrink-0">
//             <div className="h-15 md:h-20 flex items-center">
//               <img
//                 src="/cover-logo.png"
//                 alt="Al Hameed Computers"
//                 className="h-full w-auto object-contain"
//               />
//             </div>
//           </Link>

//           <div className="flex items-center gap-2 md:gap-4">
//             {/* ✅ Updated Searchbar */}
//             <Searchbar />

//             <div className="hidden sm:flex items-center gap-2 md:gap-3">
//               <Link
//                 href="/cart"
//                 className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative cursor-pointer"
//               >
//                 <ShoppingCart className="h-4 md:h-5 md:w-5 w-4" />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
//                     {cart.length}
//                   </span>
//                 )}
//               </Link>

//               <div className="relative" ref={dropdownRef}>
//                 <div className="flex gap-2 items-center">
//                   <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer">
//                     <UserRound className="h-4 md:h-5 md:w-5 w-4" />
//                   </button>
//                   <div>
//                     <p className="text-xs text-gray-500">Hello</p>
//                     <div
//                       className="relative cursor-pointer"
//                       onClick={() =>
//                         isAuthenticated
//                           ? setDropdownOpen(!dropdownOpen)
//                           : router.push("/login")
//                       }
//                     >
//                       {isAuthenticated && user ? (
//                         <span className="text-sm font-medium text-gray-700 flex relative">
//                           {user.username}
//                           <div className="absolute right-[-15] top-1">
//                             <ChevronDown className="h-3.5 w-3.5" />
//                           </div>
//                         </span>
//                       ) : (
//                         <span className="text-sm font-medium text-gray-700">
//                           Sign in
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 {dropdownOpen && isAuthenticated && (
//                   <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                     <ul className="text-sm text-gray-700">
//                       <li>
//                         <Link
//                           href="/profile"
//                           className="block px-4 py-2 hover:bg-gray-100"
//                         >
//                           My Profile
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/orders"
//                           className="block px-4 py-2 hover:bg-gray-100"
//                         >
//                           My Orders
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/reviews"
//                           className="block px-4 py-2 hover:bg-gray-100"
//                         >
//                           My Reviews
//                         </Link>
//                       </li>
//                       <li className="border-t border-accent">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 items-center flex gap-2 cursor-pointer"
//                         >
//                           <LogOut className="h-4 w-4" />
//                           Logout
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex sm:hidden items-center gap-2">
//               <button
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
//               >
//                 <Search className="h-4 w-4" />
//               </button>
//               <Link
//                 href="/cart"
//                 className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative"
//               >
//                 <ShoppingCart className="h-4 w-4" />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
//                     {cart.length}
//                   </span>
//                 )}
//               </Link>

//               <button
//                 onClick={() =>
//                   isAuthenticated
//                     ? setDropdownOpen(!dropdownOpen)
//                     : router.push("/login")
//                 }
//                 className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
//               >
//                 <UserRound className="h-4 w-4" />
//               </button>

//               {dropdownOpen && isAuthenticated && (
//                 <div className="absolute right-2 top-12 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                   <ul className="text-sm text-gray-700">
//                     <li>
//                       <Link
//                         href="/orders"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         My Orders
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/reviews"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         My Reviews
//                       </Link>
//                     </li>
//                     <li className="border-t border-accent">
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 items-center flex gap-2 cursor-pointer"
//                       >
//                         <LogOut className="h-4 w-4" />
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {isSearchOpen && (
//           <div className="sm:hidden border-t border-accent bg-white w-full">
//             <div className="max-w-6xl mx-auto px-2 py-3">
//               <MobileSearchbar />
//             </div>
//           </div>
//         )}
//       </header>

//       {isSearchOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 bg-opacity-25 z-40 sm:hidden"
//           onClick={() => {
//             setIsSearchOpen(false);
//           }}
//         ></div>
//       )}
//     </>
//   );
// };

// const Searchbar = () => {
//   const [query, setQuery] = useState("");
//   const router = useRouter();

//   const { data, isLoading } = useQuery({
//     queryKey: ["products", query],
//     queryFn: async () => {
//       const res = await axiosClient.get("api/products/", {
//         params: { search: query },
//       });
//       return res.data;
//     },
//     enabled: query.trim().length > 0,
//   });

//   const handleSearch = () => {
//     if (!query.trim()) return;

//     if (data?.results?.length === 1) {
//       router.push(`/products/${data.results[0].id}`);
//     } else {
//       router.push(`/products?search=${encodeURIComponent(query)}`);
//     }
//   };

//   const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <div className="hidden sm:flex items-center justify-between border border-accent rounded-xl p-2 text-sm w-48 sm:w-80 lg:w-140 relative">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={handleEnter}
//             className="outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400"
//           />
//           <button
//             className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
//             onClick={handleSearch}
//           >
//             <Search className="h-4 w-4" />
//           </button>
//         </div>
//       </PopoverTrigger>

//       {/* ✅ Suggestions Dropdown */}
//       {query.length > 0 && (
//         <PopoverContent>
//           <ul className="bg-white hidden sm:block sm:w-77 lg:w-137 rounded-b-lg overflow-hidden shadow-md">
//             {isLoading && (
//               <li className="py-2 px-2 text-sm text-gray-400">Loading...</li>
//             )}
//             {data?.results?.length > 0 ? (
//               data.results.map((p: any) => (
//                 <li
//                   key={p.id}
//                   className="hover:bg-gray-100 py-2 cursor-pointer px-2 max-h-12 whitespace-nowrap overflow-hidden text-ellipsis text-sm font-normal"
//                   onClick={() => router.push(`/products/${p.id}`)}
//                 >
//                   <span>
//                     {p.product_name}{" "}
//                     <span className="text-gray-500">({p.brand?.name})</span>
//                   </span>
//                 </li>
//               ))
//             ) : (
//               !isLoading && (
//                 <li className="py-2 px-2 text-sm text-gray-400">
//                   No products found
//                 </li>
//               )
//             )}
//           </ul>
//         </PopoverContent>
//       )}
//     </Popover>
//   );
// };

// const MobileSearchbar = () => {
//   const results = [
//     "MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card",
//     "MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card fafasfaf fafa ",
//     "MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card fafasfaf fafa ",
//     "MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Cardwdadadasda ",
//     "MSI GeForce RTX 5090 32G Gaming Trio OC Graphics Card",
//   ];
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <div className="flex items-center justify-between border border-accent rounded-lg p-2">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400"
//             autoFocus
//           />
//           <button className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0">
//             <Search className="h-4 w-4" />
//           </button>
//         </div>
//       </PopoverTrigger>
//       <PopoverContent>
//         <ul className="bg-red-300 min-w-80 max-w-147 mx-2 rounded-b-lg">
//           {results.map((r, i) => (
//             <li
//               key={i}
//               className="hover:bg-gray-100 py-2 cursor-pointer px-2 max-h-12 whitespace-nowrap overflow-hidden text-ellipsis text-xs font-normal"
//             >
//               <Link href={`/products`}>{r}</Link>
//             </li>
//           ))}
//         </ul>
//       </PopoverContent>
//     </Popover>
//   );
// };


"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  LogOut,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/index";
import { useCart } from "@/hooks/useCart";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/_api/axiosClient";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const { isAuthenticated, user, handleLogout } = useAuth();
  const { cart } = useCart();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <header className="border-b border-accent sticky top-0 z-50 bg-white">
        <div className="flex items-center justify-between max-w-6xl mx-auto px-2 md:px-4 py-2">
          <Link href="/" className="flex-shrink-0">
            <div className="h-15 md:h-20 flex items-center">
              <img
                src="/cover-logo.png"
                alt="Al Hameed Computers"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {/* ✅ Updated Searchbar */}
            <Searchbar />

            <div className="hidden sm:flex items-center gap-2 md:gap-3">
              <Link
                href="/cart"
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative cursor-pointer"
              >
                <ShoppingCart className="h-4 md:h-5 md:w-5 w-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {cart.length}
                  </span>
                )}
              </Link>

              <div className="relative" ref={dropdownRef}>
                <div className="flex gap-2 items-center">
                  <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer">
                    <UserRound className="h-4 md:h-5 md:w-5 w-4" />
                  </button>
                  <div>
                    <p className="text-xs text-gray-500">Hello</p>
                    <div
                      className="relative cursor-pointer"
                      onClick={() =>
                        isAuthenticated
                          ? setDropdownOpen(!dropdownOpen)
                          : router.push("/login")
                      }
                    >
                      {isAuthenticated && user ? (
                        <span className="text-sm font-medium text-gray-700 flex relative">
                          {user.username}
                          <div className="absolute right-[-15] top-1">
                            <ChevronDown className="h-3.5 w-3.5" />
                          </div>
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-gray-700">
                          Sign in
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {dropdownOpen && isAuthenticated && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="text-sm text-gray-700">
                      <li>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/reviews"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Reviews
                        </Link>
                      </li>
                      <li className="border-t border-accent">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 items-center flex gap-2 cursor-pointer"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
              <Link
                href="/cart"
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {cart.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() =>
                  isAuthenticated
                    ? setDropdownOpen(!dropdownOpen)
                    : router.push("/login")
                }
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <UserRound className="h-4 w-4" />
              </button>

              {dropdownOpen && isAuthenticated && (
                <div className="absolute right-2 top-12 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="text-sm text-gray-700">
                    <li>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/reviews"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Reviews
                      </Link>
                    </li>
                    <li className="border-t border-accent">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 items-center flex gap-2 cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="sm:hidden border-t border-accent bg-white w-full">
            <div className="max-w-6xl mx-auto px-2 py-3">
              <MobileSearchbar />
            </div>
          </div>
        )}
      </header>

      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-25 z-40 sm:hidden"
          onClick={() => {
            setIsSearchOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["products", query],
    queryFn: async () => {
      const res = await axiosClient.get("api/products/", {
        params: { search: query },
      });
      return res.data;
    },
    enabled: query.trim().length > 0,
  });

  const handleSearch = () => {
    if (!query.trim()) return;

    if (data?.results?.length === 1) {
      router.push(`/products/${data.results[0].id}`);
    } else {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="hidden sm:flex items-center justify-between border border-accent rounded-xl p-2 text-sm w-48 sm:w-80 lg:w-140 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleEnter}
            className="outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400"
          />
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </PopoverTrigger>

      {/* ✅ Suggestions Dropdown */}
      {query.length > 0 && (
        <PopoverContent>
          <ul className="bg-white hidden sm:block sm:w-77 lg:w-137 rounded-b-lg overflow-hidden shadow-md">
            {isLoading && (
              <li className="py-2 px-2 text-sm text-gray-400">Loading...</li>
            )}
            {data?.results?.length > 0 ? (
              data.results.map((p: any) => (
                <li
                  key={p.id}
                  className="hover:bg-gray-100 py-2 cursor-pointer px-2 max-h-12 whitespace-nowrap overflow-hidden text-ellipsis text-sm font-normal"
                  onClick={() => router.push(`/products/${p.id}`)}
                >
                  <span>
                    {p.product_name}
                    {p.brand?.name && (
                      <span className="text-gray-500"> ({p.brand.name})</span>
                    )}
                    {p.category?.name && (
                      <span className="text-gray-400"> – {p.category.name}</span>
                    )}
                  </span>
                </li>
              ))
            ) : (
              !isLoading && (
                <li className="py-2 px-2 text-sm text-gray-400">
                  No products found
                </li>
              )
            )}
          </ul>
        </PopoverContent>
      )}
    </Popover>
  );
};

const MobileSearchbar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["mobile-products", query],
    queryFn: async () => {
      const res = await axiosClient.get("api/products/", {
        params: { search: query },
      });
      return res.data;
    },
    enabled: query.trim().length > 0,
  });

  const handleSearch = () => {
    if (!query.trim()) return;

    if (data?.results?.length === 1) {
      router.push(`/products/${data.results[0].id}`);
    } else {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-between border border-accent rounded-lg p-2">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400"
            autoFocus
          />
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </PopoverTrigger>

      {query.length > 0 && (
        <PopoverContent>
          <ul className="bg-white min-w-80 max-w-147 mx-2 rounded-b-lg shadow-md">
            {isLoading && (
              <li className="py-2 px-2 text-sm text-gray-400">Loading...</li>
            )}
            {data?.results?.length > 0 ? (
              data.results.map((p: any) => (
                <li
                  key={p.id}
                  className="hover:bg-gray-100 py-2 cursor-pointer px-2 max-h-12 whitespace-nowrap overflow-hidden text-ellipsis text-xs font-normal"
                  onClick={() => router.push(`/products/${p.id}`)}
                >
                  <span>
                    {p.product_name}
                    {p.brand?.name && (
                      <span className="text-gray-500"> ({p.brand.name})</span>
                    )}
                  </span>
                </li>
              ))
            ) : (
              !isLoading && (
                <li className="py-2 px-2 text-sm text-gray-400">
                  No products found
                </li>
              )
            )}
          </ul>
        </PopoverContent>
      )}
    </Popover>
  );
};
