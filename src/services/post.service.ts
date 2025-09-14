import { convertPrismaError } from "@/lib/convert-prisma-error";
import { prisma } from "@/lib/prisma";
import type { PaginationOptions } from "@/lib/validators/pagination/types";
import type { CreatePostInput } from "@/lib/validators/post/types";

export async function createPost(data: CreatePostInput) {
  try {
    const post = await prisma.post.create({ data });

    return post;
  } catch (error: unknown) {
    throw convertPrismaError(error);
  }
}

export async function getPost(id: number) {
  try {
    const post = await prisma.post.findUnique({ where: { id } });

    return post;
  } catch (error: unknown) {
    throw convertPrismaError(error);
  }
}

export async function listPosts({ skip = 0, take = 10 }: PaginationOptions) {
  try {
    const [data, total] = await prisma.$transaction([
      prisma.post.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.post.count(),
    ]);

    return { data, total };
  } catch (error: unknown) {
    throw convertPrismaError(error);
  }
}

export async function updatePost(id: number, data: Partial<CreatePostInput>) {
  try {
    const post = await prisma.post.update({ where: { id }, data });

    return post;
  } catch (error: unknown) {
    throw convertPrismaError(error);
  }
}

export async function deletePost(id: number) {
  try {
    const post = await prisma.post.delete({ where: { id } });

    return post;
  } catch (error: unknown) {
    throw convertPrismaError(error);
  }
}
