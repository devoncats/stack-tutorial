import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1).max(60),
  content: z.string().min(1).max(280).optional(),
  authorId: z.cuid(),
});

export const updatePostSchema = z
  .object({
    title: z.string().min(1).max(60).optional(),
    content: z.string().min(1).max(280).optional(),
    published: z.boolean().optional(),
    authorId: z.cuid().optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.content !== undefined ||
      data.published !== undefined ||
      data.authorId !== undefined,
    {
      message:
        "At least one field (title, content, published, or authorId) must be provided for update",
    },
  );
