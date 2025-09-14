import {
  createPostSchema,
  updatePostSchema,
} from "@/lib/validators/post/schema";

export function validateCreatePost(data: unknown) {
  return createPostSchema.safeParse(data);
}

export function validateUpdatePost(data: unknown) {
  return updatePostSchema.safeParse(data);
}
