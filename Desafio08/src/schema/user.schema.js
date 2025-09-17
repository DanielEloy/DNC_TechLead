import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = z.object({
  username: z
    .string()
    .trim()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long"),

  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email(
      emailRegex, 
      "Invalid email address (cannot contain spaces)")
    .toLowerCase(),

  password: z
    .string()
    .trim()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(8, "Password must be at most 8 characters long")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  avatar: z
    .string()
    .url("Invalid URL")
    .optional(),
});

const userUpdateSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .optional(),

  email: z
    .string()
    .trim()
    .email("Invalid email address (cannot contain spaces)")
    .toLowerCase()
    .optional(),

  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .max(8, "Password must be at most 8 characters long")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .optional(),

  avatar: z
    .string()
    .url("Invalid URL")
    .optional(),
});

export { userSchema, userUpdateSchema }