import type { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { jwtVerify, SignJWT } from "jose";
import { twMerge } from "tailwind-merge";
import { SessionPayload } from "./definitions";

const secretKey = process.env.SESSION_SECRET;
export const encodedKey = new TextEncoder().encode(secretKey);

export function prismaErrorMessageResolver(
  error: Prisma.PrismaClientKnownRequestError
) {
  switch (error.code) {
    case "P2002":
      return "Unique constraint violation";
    case "P2003":
      return "Foreign key constraint violation";
    case "P2004":
      return "Constraint failed on the database";
    case "P2016":
      return "Required relation not found";
    case "P2025":
      return "Record to update/delete not found";
    default:
      return "Database is sick!";
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function encrypt(payload: SessionPayload, encodedKey: Uint8Array) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = "",
  encodedKey: Uint8Array
) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
