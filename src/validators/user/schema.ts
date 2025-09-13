import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string().min(2).max(100).optional(),
});

export const updateUserSchema = z
  .object({
    email: z.email().optional(),
    name: z.string().min(2).max(100).optional(),
  })
  .refine((data) => data.email !== undefined || data.name !== undefined, {
    message: "At least one field (email or name) must be provided for update",
  });
