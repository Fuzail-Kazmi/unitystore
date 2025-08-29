"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingCart, UserRound } from 'lucide-react';

export const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <>
            <header className='border-b border-accent sticky top-0 z-50 bg-white'>
                <div className="flex items-center justify-between max-w-6xl mx-auto py-2 px-2 md:py-4 md:px-4">
                    <Link href="/" className="flex-shrink-0">
                        <div className="flex items-center gap-2 ">
                            <img src="/logo.png" alt="UnityStore" className="h-10 w-10 md:h-12 md:w-12" />
                            <div className="text-primary font-bold text-lg md:text-xl">UnityStore</div>
                        </div>
                    </Link>

                    <div className='flex items-center gap-2 md:gap-4'>
                        <div className='hidden sm:flex items-center justify-between border border-accent rounded-xl p-2 text-sm w-48 sm:w-80 lg:w-140'>
                            <input
                                type="text"
                                placeholder='Search products...'
                                className='outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400'
                            />
                            <button className='text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0'>
                                <Search className='h-4 w-4' />
                            </button>
                        </div>
                        <div className='hidden sm:flex items-center gap-2 md:gap-3'>
                            <Link href='/cart' className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative cursor-pointer'>
                                <ShoppingCart className='h-4 md:h-5 md:w-5 w-4' />
                                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]'>
                                    2
                                </span>
                            </Link>

                            <div className='flex items-center gap-2'>
                                <button className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer'>
                                    <UserRound className='h-4 md:h-5 md:w-5 w-4' />
                                </button>
                                <div>
                                    <p className='text-xs text-gray-500'>Hello</p>
                                    <p className='text-sm text-gray-700 font-medium'>Sign in</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex sm:hidden items-center gap-2'>
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors'
                            >
                                <Search className='h-4 w-4' />
                            </button>

                            <button className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors relative'>
                                <ShoppingCart className='h-4 w-4' />
                                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]'>
                                    2
                                </span>
                            </button>

                            <button className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors'>
                                <UserRound className='h-4 w-4' />
                            </button>
                        </div>

                    </div>
                </div>
                {isSearchOpen && (
                    <div className='sm:hidden border-t border-accent bg-white'>
                        <div className='max-w-6xl mx-auto px-3 py-3'>
                            <div className='flex items-center justify-between border border-accent rounded-lg p-2'>
                                <input
                                    type="text"
                                    placeholder='Search products...'
                                    className='outline-none border-none text-sm px-2 w-full bg-transparent placeholder:text-gray-400'
                                    autoFocus
                                />
                                <button className='text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0'>
                                    <Search className='h-4 w-4' />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>
            {(isSearchOpen) && (
                <div
                    className="fixed inset-0 bg-black/40 bg-opacity-25 z-40 sm:hidden"
                    onClick={() => {
                        setIsSearchOpen(false);
                    }}
                ></div>
            )}
        </>
    )
}