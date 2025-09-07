// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Search, ShoppingCart, UserRound } from "lucide-react";
// import { useAuth } from "@/app/_hooks/index";
// import { useRouter } from "next/navigation";

// export const Header = () => {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     document.cookie = "access_token=; Max-Age=0";
//     router.push("/login");
//   };

//   return (
//     <>
//       <header className="border-b border-accent sticky top-0 z-50 bg-white">
//         <div className="flex items-center justify-between max-w-6xl mx-auto py-2 px-2 md:py-4 md:px-4">
//           <Link href="/" className="flex-shrink-0">
//             <div className="flex items-center gap-2 ">
//               <img
//                 src="/logo.png"
//                 alt="UnityStore"
//                 className="h-10 w-10 md:h-12 md:w-12"
//               />
//               <div className="text-primary font-bold text-lg md:text-xl">
//                 UnityStore
//               </div>
//             </div>
//           </Link>

//           <div className="flex items-center gap-2 md:gap-4">
//             <div className="hidden sm:flex items-center justify-between border border-accent rounded-xl p-2 text-sm w-48 sm:w-80 lg:w-140">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400"
//               />
//               <button className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0">
//                 <Search className="h-4 w-4" />
//               </button>
//             </div>

//             <div className="hidden sm:flex items-center gap-2 md:gap-3">
//               <Link
//                 href="/cart"
//                 className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative cursor-pointer"
//               >
//                 <ShoppingCart className="h-4 md:h-5 md:w-5 w-4" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
//                   2
//                 </span>
//               </Link>

//               <div className="flex items-center gap-2">
//                 <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer">
//                   <UserRound className="h-4 md:h-5 md:w-5 w-4" />
//                 </button>
//                 <div>
//                   <p className="text-xs text-gray-500">Hello</p>

//                   {/* {mounted &&
//                     (isAuthenticated ? (
//                       <button
//                         className="text-sm text-gray-700 font-medium"
//                       >
//                         Sign in
//                       </button>
//                     ) : (
//                       <button
//                         onClick={handleLogout}
//                         className="text-sm text-gray-700 font-medium"
//                       >
//                         Sign out
//                       </button>
//                     ))} */}
//                     <button onClick={handleLogout} className="hover:bg-red-300">Sign out</button>
//                 </div>
//               </div>
//             </div>

//             <div className="flex sm:hidden items-center gap-2">
//               <button
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
//               >
//                 <Search className="h-4 w-4" />
//               </button>

//               <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative">
//                 <ShoppingCart className="h-4 w-4" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
//                   2
//                 </span>
//               </button>

//               <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
//                 <UserRound className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {isSearchOpen && (
//           <div className="sm:hidden border-t border-accent bg-white">
//             <div className="max-w-6xl mx-auto px-3 py-3">
//               <div className="flex items-center justify-between border border-accent rounded-lg p-2">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400"
//                   autoFocus
//                 />
//                 <button className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0">
//                   <Search className="h-4 w-4" />
//                 </button>
//               </div>
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_hooks";
import { useCart } from "@/app/_hooks/useCart";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const { isAuthenticated, user, handleLogout } = useAuth();
  const { cart } = useCart();

  return (
    <>
      <header className="border-b border-accent sticky top-0 z-50 bg-white">
        <div className="flex items-center justify-between max-w-6xl mx-auto py-2 px-2 md:py-4 md:px-4">
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2 ">
              <img
                src="/logo.png"
                alt="UnityStore"
                className="h-10 w-10 md:h-12 md:w-12"
              />
              <div className="text-primary font-bold text-lg md:text-xl">
                UnityStore
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Search */}
            <div className="hidden sm:flex items-center justify-between border border-accent rounded-xl p-2 text-sm w-48 sm:w-80 lg:w-140">
              <input
                type="text"
                placeholder="Search products..."
                className="outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400"
              />
              <button className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0">
                <Search className="h-4 w-4" />
              </button>
            </div>

            {/* Desktop Cart + User */}
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

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <UserRound className="h-4 md:h-5 md:w-5 w-4" />
                  {isAuthenticated && user ? (
                    <span className="text-sm font-medium text-gray-700">
                      {user.username}
                    </span>
                  ) : (
                    <span
                      onClick={() => router.push("/login")}
                      className="text-sm font-medium text-gray-700"
                    >
                      Sign in
                    </span>
                  )}
                </button>

                {dropdownOpen && isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
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
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Icons */}
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
                onClick={() => setDropdownOpen(!dropdownOpen)}
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
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search open state */}
        {isSearchOpen && (
          <div className="sm:hidden border-t border-accent bg-white">
            <div className="max-w-6xl mx-auto px-3 py-3">
              <div className="flex items-center justify-between border border-accent rounded-lg p-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400"
                  autoFocus
                />
                <button className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0">
                  <Search className="h-4 w-4" />
                </button>
              </div>
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


