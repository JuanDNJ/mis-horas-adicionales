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

/**
 * Calculates the duration in hours between two time strings (HH:MM).
 * Returns the duration formatted as a string with 2 decimal places.
 * Handles crossing midnight (e.g. 23:00 to 01:00).
 */
export function calculateDuration(startTime: string, endTime: string): string {
  if (!startTime || !endTime) return "";

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const startDate = new Date(0, 0, 0, startHours, startMinutes);
  const endDate = new Date(0, 0, 0, endHours, endMinutes);

  let diff = endDate.getTime() - startDate.getTime();

  // Handle overnight shift (e.g. 22:00 -> 02:00)
  if (diff < 0) {
    diff += 24 * 60 * 60 * 1000;
  }

  const hours = diff / (1000 * 60 * 60);
  // Round to 2 decimal places if needed, or keeping it clean
  return hours % 1 === 0 ? hours.toString() : hours.toFixed(2);
}

