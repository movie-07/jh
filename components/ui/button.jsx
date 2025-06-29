"use client";
import React from 'react';

export const Button = ({ children, onClick, className = '', type = 'button', variant = 'default', size = 'md' }) => {
  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition duration-200 focus:outline-none';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-gray-100 text-black hover:bg-gray-200',
  };
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};
