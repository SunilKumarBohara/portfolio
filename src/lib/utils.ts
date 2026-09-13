import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNepalTime(includeSeconds = false): string {
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      ...(includeSeconds ? { second: "2-digit" } : {}),
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date());
  } catch (e) {
    // Fallback in case of environment issue
    return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  }
}
