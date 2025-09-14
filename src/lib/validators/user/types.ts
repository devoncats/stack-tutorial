import type { z } from "zod";
import type {
  createUserSchema,
  updateUserSchema,
} from "@/lib/validators/user/schema";

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
