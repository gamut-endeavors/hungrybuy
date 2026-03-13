import { Router } from "express";
import {
  getUser,
  loginUser,
  logout,
  refreshToken,
} from "../controllers/auth.controller";
import { sendOtp } from "../controllers/otp.controller";
import { validate } from "../middlewares/validate.middleware";
import { LoginUserBody, SendOtpBody } from "../validation/auth.schema";
import { requireRole } from "../middlewares/role.middleware";
import { loginLimiter, otpLimiter } from "../lib/rateLimiter";

const router = Router();

router.get(
  "/me",
  requireRole(["CUSTOMER", "RESTAURANT_OWNER", "PLATFORM_ADMIN"]),
  getUser,
);

router.post("/login", validate(LoginUserBody), loginLimiter, loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

router.post("/send-otp", validate(SendOtpBody), otpLimiter, sendOtp);

export default router;
