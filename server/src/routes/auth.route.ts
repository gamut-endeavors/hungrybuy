import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { sendOtp } from "../controllers/otp.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  LoginUserSchema,
  OtpRequestSchema,
  RegisterUserSchema,
} from "../validation/auth.schema";

const router = Router();

router.post("/register", validate(RegisterUserSchema), registerUser);
router.post("/login", validate(LoginUserSchema), loginUser);

router.post("/send-otp", validate(OtpRequestSchema), sendOtp);

export default router;
