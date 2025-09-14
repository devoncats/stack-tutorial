import {
  createUserSchema,
  updateUserSchema,
} from "@/lib/validators/user/schema";

export function validateCreateUser(data: unknown) {
  return createUserSchema.safeParse(data);
}

export function validateUpdateUser(data: unknown) {
  return updateUserSchema.safeParse(data);
}
