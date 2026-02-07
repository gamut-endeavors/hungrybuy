import { NextFunction, Response } from "express";
import { TypedRequest } from "../types/request";

export function verifyTable(
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) {
  const tableHeader = req.headers["x-table-id"];
  if (!tableHeader) {
    return res.status(401).json({ message: "Table session token invalid" });
  }
}
