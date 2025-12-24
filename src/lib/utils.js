import { clsx } from "clsx";

export const createPageUrl = (pageName) => {
  return `/${pageName}`;
};

export function cn(...inputs) {
  return clsx(inputs);
}