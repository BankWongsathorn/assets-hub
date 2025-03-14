import { v4 as uuidv4 } from "uuid";

export function generateUUIDv4(prefix: string = "SN"): string {
  const uuid = uuidv4().toUpperCase();
  return `${prefix}${uuid.replace(/-/g, "")}`;
}
