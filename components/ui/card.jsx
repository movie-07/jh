"use client";
import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
};
