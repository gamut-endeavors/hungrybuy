import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { socketAuthMiddleware } from "./auth.socket";
import { AuthenticatedSocket } from "./types";
import { logger } from "../lib/logger";
import { redis } from "../lib/redis";

export let io: Server;

export async function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: [
        process.env.FRONTEND_URL!,
        process.env.ADMIN_URL!,
        "http://172.21.34.122:3001",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },

    pingTimeout: 60000,
    pingInterval: 25000,
  });

  const pubClient = redis.duplicate();
  const subClient = redis.duplicate();

  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));

  io.use(socketAuthMiddleware);

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log("socket connected:", socket.id, socket.user);

    if (socket.user?.role === "RESTAURANT_OWNER") {
      const room = `restaurant:${socket.user.restaurantId}`;
      socket.join(room);

      logger.info(
        `Restaurant ${socket.user.restaurantId} connected to room ${room}`,
      );
    }

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
}
