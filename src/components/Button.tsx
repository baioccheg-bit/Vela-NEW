"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-champagne/50";

    const variants = {
      primary: "bg-champagne text-obsidian hover:bg-amber-gold shadow-sm hover:shadow-md",
      secondary: "bg-obsidian text-ivory hover:bg-obsidian/80",
      ghost: "text-obsidian/70 hover:text-obsidian hover:bg-obsidian/5",
      outline: "border border-obsidian/20 text-obsidian hover:border-champagne hover:bg-champagne/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3.5 text-base",
    };

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, href, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-champagne/50";

    const variants = {
      primary: "bg-champagne text-obsidian hover:bg-amber-gold shadow-sm hover:shadow-md",
      secondary: "bg-obsidian text-ivory hover:bg-obsidian/80",
      ghost: "text-obsidian/70 hover:text-obsidian hover:bg-obsidian/5",
      outline: "border border-obsidian/20 text-obsidian hover:border-champagne hover:bg-champagne/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3.5 text-base",
    };

    return (
      <motion.a
        ref={ref}
        href={href}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
);

LinkButton.displayName = "LinkButton";
