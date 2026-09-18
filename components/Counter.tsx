"use client";

import { useCounter } from "@/lib/animations";
import { formatNumber } from "@/lib/utils";

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Compteur qui monte — la valeur finale est toujours présente en SSR
 * (useCounter initialise l'état à `value`), l'animation depuis 0 n'est
 * qu'un rejeu visuel côté client. */
export function Counter({ value, suffix = "", className }: CounterProps) {
  const { ref, value: current } = useCounter(value);
  return (
    <span ref={ref} className={className}>
      {formatNumber(current)}
      {suffix}
    </span>
  );
}
