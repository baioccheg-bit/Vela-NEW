"use client";

/**
 * Legacy Button + LinkButton — usados nas rotas antigas (/planos, etc).
 * Foi reescrito pra remover framer-motion (que causava type drift em v12
 * e contradiz design.md § Motion stance). Visual idêntico via CSS.
 */
import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center font-medium rounded-full " +
  "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-champagne/50 " +
  "hover:scale-[1.03] active:scale-[0.98]";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-champagne text-obsidian hover:bg-amber-gold shadow-sm hover:shadow-md",
  secondary: "bg-obsidian text-ivory hover:bg-obsidian/80",
  ghost: "text-obsidian/70 hover:text-obsidian hover:bg-obsidian/5",
  outline: "border border-obsidian/20 text-obsidian hover:border-champagne hover:bg-champagne/5",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const classes = (variant: Variant, size: Size, extra = "") =>
  `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`;

/* ── Button ── */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => (
    <button ref={ref} className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  ),
);
Button.displayName = "Button";

/* ── LinkButton ── */
interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  href: string;
  children: ReactNode;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, href, ...props }, ref) => (
    <a ref={ref} href={href} className={classes(variant, size, className)} {...props}>
      {children}
    </a>
  ),
);
LinkButton.displayName = "LinkButton";
