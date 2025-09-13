import type { Post, User } from "@/generated/prisma";

export type PostDTO = Omit<Post, "createdAt" | "updatedAt">;
export type UserDTO = Omit<User, "createdAt" | "updatedAt">;
