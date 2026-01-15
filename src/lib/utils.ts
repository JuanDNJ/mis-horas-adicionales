import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes safely.
 * It combines the power of clsx (conditional classes) and tailwind-merge (resolving conflicts).
 *
 * Example: cn('px-2 py-1', isSelected && 'bg-blue-500', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
