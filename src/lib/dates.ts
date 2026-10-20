import type { YearMonth } from "@/types/content";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parse(value: YearMonth): { year: number; month: number } {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

/** Months since year 0, so two dates can be subtracted. */
function toIndex(value: YearMonth | "present", now: Date): number {
  if (value === "present") {
    return now.getFullYear() * 12 + now.getMonth();
  }
  const { year, month } = parse(value);
  return year * 12 + (month - 1);
}

/** "2024-03" -> "Mar 2024" */
export function formatMonth(value: YearMonth | "present"): string {
  if (value === "present") return "Present";
  const { year, month } = parse(value);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "Mar 2024 – Present" */
export function formatRange(
  start: YearMonth,
  end: YearMonth | "present",
): string {
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}

/**
 * Inclusive duration, counted the way LinkedIn does:
 * Mar 2022 – Mar 2024 -> "2 yrs 1 mo".
 */
export function formatDuration(
  start: YearMonth,
  end: YearMonth | "present",
  now: Date = new Date(),
): string {
  const months = toIndex(end, now) - toIndex(start, now) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (rest > 0) parts.push(`${rest} ${rest === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

/** Whole years since the career start date. */
export function yearsSince(start: YearMonth, now: Date = new Date()): number {
  return Math.floor((toIndex("present", now) - toIndex(start, now)) / 12);
}

/** Machine-readable value for <time dateTime>. */
export function toDateTime(value: YearMonth): string {
  const { year, month } = parse(value);
  return `${year}-${String(month).padStart(2, "0")}`;
}
