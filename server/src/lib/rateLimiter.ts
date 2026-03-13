import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts, please try again after 5 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const otpLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 3,
  message: {
    message: "Too many otp attempts, please try again after 2 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
