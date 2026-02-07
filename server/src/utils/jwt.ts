import { Role } from "@prisma/client";
import jwt, { Secret, sign, SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
const EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES as SignOptions["expiresIn"]) || "7d";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export type JwtPayload = {
  id: string;
  role: Role;
};

export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken<T extends object>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}

export function generateTableToken(tableId: string): string {
  return jwt.sign({ id: tableId }, JWT_SECRET, { expiresIn: "2h" });
}

export function verifyTableToken<T extends Object>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
