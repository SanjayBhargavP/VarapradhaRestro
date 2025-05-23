import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatTime(time: string) {
  return time;
}

export const orderStatusMap = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  READY: "Ready",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const reservationStatusMap = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

export const paymentStatusMap = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export const paymentMethods = [
  { id: "upi", name: "UPI (PhonePe, Google Pay, Paytm)" },
  { id: "card", name: "Credit/Debit Card" },
  { id: "netbanking", name: "Net Banking" },
  { id: "wallet", name: "Wallet (Paytm, PhonePe)" },
  { id: "cod", name: "Cash on Delivery" },
];

export function generateTimeSlots() {
  const slots = [];
  for (let hour = 11; hour <= 22; hour++) {
    const hourFormatted = hour > 12 ? hour - 12 : hour;
    const amPm = hour >= 12 ? "PM" : "AM";
    
    slots.push(`${hourFormatted}:00 ${amPm}`);
    slots.push(`${hourFormatted}:30 ${amPm}`);
  }
  return slots;
}