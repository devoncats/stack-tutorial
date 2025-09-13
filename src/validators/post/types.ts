import type { z } from "zod";
import type {
  createPostSchema,
  updatePostSchema,
} from "@/validators/post/schema";

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
