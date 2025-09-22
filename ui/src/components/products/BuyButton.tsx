"use client";
import React from "react";

type BuyButtonProps = {
  children: React.ReactNode;
  onClick?: () => void; 
  className?: string; 
};

const BuyButton: React.FC<BuyButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-white py-3 px-6 rounded-lg ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default BuyButton;
