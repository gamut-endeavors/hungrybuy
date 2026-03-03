import { verifyAccessToken } from "../utils/jwt";
import { AuthenticatedSocket } from "./types";

export async function socketAuthMiddleware(
  socket: AuthenticatedSocket,
  next: (err?: Error) => void,
) {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }

    const payload = verifyAccessToken(token);

    socket.user = {
      id: payload.id,
      role: payload.role,
      sessionId: payload.sessionId,
    };

    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
}
