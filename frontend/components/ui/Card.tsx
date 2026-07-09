"use client";

import { type HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> { hover?: boolean; }

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, className = "", children, ...props }, ref) => (
    <div ref={ref} className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 ${hover ? "hover:shadow-md transition-shadow cursor-pointer" : ""} ${className}`} {...props}>
      {children}
    </div>
  )
);

Card.displayName = "Card";
export default Card;
