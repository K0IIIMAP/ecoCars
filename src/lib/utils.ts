import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);

  // Get the day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Get the month
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthsOfYear[date.getMonth()];

  // Get the time in hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure 2 digits for minutes

  // Construct the formatted string
  const formatted = `${dayOfWeek}, ${month} ${date.getDate()}, ${hours}:${minutes}`;

  return formatted;
}

export function formatMonthYear(isoString: string) {
  const date = new Date(isoString);

  // Get the month
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthsOfYear[date.getMonth()];

  // Get the year
  const year = date.getFullYear();

  // Construct the formatted string
  const formatted = `${month} ${year}`;

  return formatted;
}
