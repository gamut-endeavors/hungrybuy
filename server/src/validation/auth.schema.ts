import { z } from "zod";

export const AdminLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(32),
});

export const CreateShopSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(3).max(32),
});

export const RegisterUserSchema = z.object({
  name: z.string(),
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export const LoginUserSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export const OtpRequestSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number"),
});
