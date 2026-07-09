"use client";

import { type HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, padding = "md", className = "", children, ...props }, ref) => {
    const paddings = { sm: "p-4", md: "p-6", lg: "p-8" };
    return (
      <div
        ref={ref}
        className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${paddings[padding]} ${hover ? "card-warm-hover cursor-pointer" : ""} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;
