import { siteConfig } from "@/lib/site";

/**
 * Client names with an anonymous fallback. Which one is shown is controlled
 * by `siteConfig.showClientNames`.
 */
const clients = {
  cimb: { name: "CIMB Malaysia", anonymous: "a major Malaysian bank" },
  allianz: { name: "Allianz Malaysia", anonymous: "a Malaysian insurer" },
  tokioMarine: {
    name: "Tokio Marine Insurance Malaysia",
    anonymous: "a second Malaysian insurer",
  },
} as const;

export type ClientKey = keyof typeof clients;

export function client(key: ClientKey): string {
  return siteConfig.showClientNames
    ? clients[key].name
    : clients[key].anonymous;
}

/** "A and B" */
export function clientList(...keys: ClientKey[]): string {
  const names = keys.map(client);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** Capitalises the first letter, for anonymous names at the start of a line. */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
