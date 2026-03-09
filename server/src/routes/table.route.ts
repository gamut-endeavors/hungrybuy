import { Router } from "express";
import {
  createTable,
  deleteTable,
  getAllTables,
  generateTableQr,
  resolveQr,
  verifyRestaurantTable,
} from "../controllers/table.controller";
import { requireRole } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  CreateTableBody,
  DeleteTableParams,
  GenerateTableQrParams,
  ResolveQrParams,
} from "../validation/table.schema";
import { resolveTenant } from "../middlewares/restaurant.middleware";
import { verifyTable } from "../middlewares/table.middleware";

const router = Router();

router.get("/", requireRole(["RESTAURANT_OWNER"]), resolveTenant, getAllTables);

router.post(
  "/create",
  requireRole(["RESTAURANT_OWNER"]),
  validate(CreateTableBody),
  resolveTenant,
  createTable,
);

router.delete(
  "/:id",
  requireRole(["RESTAURANT_OWNER"]),
  validate(DeleteTableParams, "params"),
  resolveTenant,
  deleteTable,
);

router.get(
  "/:id/qr",
  requireRole(["RESTAURANT_OWNER"]),
  validate(GenerateTableQrParams, "params"),
  resolveTenant,
  generateTableQr,
);

router.get(
  "/qr/:qrToken",
  requireRole(["CUSTOMER"]),
  validate(ResolveQrParams, "params"),
  resolveQr,
);

router.get(
  "/verify",
  requireRole(["CUSTOMER"]),
  verifyTable,
  verifyRestaurantTable,
);

export default router;
