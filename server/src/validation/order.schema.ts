import { z } from "zod";

export const UpdateOrderParams = z.object({
  orderId: z.uuidv4(),
});

export type UpdateOrderParams = z.infer<typeof UpdateOrderParams>;

export const UpdateOrderStatusBody = z.object({
  status: z.enum(["PENDING", "CANCELLED", "SERVED", "PAID"]),
});

export type UpdateOrderStatusBody = z.infer<typeof UpdateOrderStatusBody>;

export const ActiveOrdersParams = z.object({
  tableId: z.uuidv4(),
});

export type ActiveOrdersParams = z.infer<typeof ActiveOrdersParams>;

export const CreateOrderParams = z.object({
  tableId: z.uuidv4(),
});

export type CreateOrderParams = z.infer<typeof CreateOrderParams>;
