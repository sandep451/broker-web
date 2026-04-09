import { z } from "zod";

export const SignupSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(10).max(15)
});

export const VerifyOtpSchema = z.object({
  emailOrMobile: z.string().min(3),
  otp: z.string().length(6)
});

export const KycSchema = z.object({
  pan: z.string().min(10).max(10),
  dob: z.string().min(8),
  address: z.string().min(5)
});

export const PlaceOrderSchema = z.object({
  symbol: z.string().min(1),
  side: z.enum(["BUY", "SELL"]),
  type: z.enum(["MARKET", "LIMIT", "SL", "SL-M"]),
  qty: z.number().int().positive(),
  price: z.number().positive().optional()
});
