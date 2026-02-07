import { Request } from "express";
import { AuthenticatedRequest } from "./auth";

export interface TableContext {
  tableId: string;
  sessionId: string;
}

export type TypedRequest<
  P = unknown,
  B = unknown,
  Q = unknown,
> = AuthenticatedRequest &
  Request<P, any, B, Q> & {
    table?: TableContext;
  };
