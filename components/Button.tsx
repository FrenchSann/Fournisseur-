import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-s2 rule-structure px-s5 py-s3 text-label " +
  "transition-[transform,box-shadow] duration-[var(--d-fast)] ease-[var(--e-out)] " +
  "hover:-translate-x-[4px] hover:-translate-y-[4px] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0";

const variantStyles: Record<Variant, string> = {
  primary: "bg-creme text-nuit hover:shadow-print-matcha",
  secondary: "bg-nuit text-creme hover:shadow-print",
};

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  cursorLabel?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children, cursorLabel = "ouvrir", ...rest } = props;
  const styles = cn(base, variantStyles[variant], className);

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={styles} data-cursor-label={cursorLabel} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} data-cursor-label={cursorLabel} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
