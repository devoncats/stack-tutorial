import { convertPrismaError } from "@/lib/convert-prisma-error";
import { prisma } from "@/lib/prisma";
import type { PaginationOptions } from "@/lib/validators/pagination/types";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "@/lib/validators/user/types";

export async function createUser(data: CreateUserInput) {
  try {
    const user = await prisma.user.create({ data });

    return user;
  } catch (error: unknown) {
    throw convertPrismaError(error);
  }
}

export async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch (error: unknown) {
    throw convertPrismaError(error);
  }
}

export async function listUsers({ skip = 0, take = 10 }: PaginationOptions) {
  try {
    const [data, total] = await prisma.$transaction([
      prisma.user.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count(),
    ]);

    return { data, total };
  } catch (error: unknown) {
    throw convertPrismaError(error);
  }
}

export async function updateUser(id: string, data: UpdateUserInput) {
  try {
    const user = await prisma.user.update({ where: { id }, data });

    return user;
  } catch (error: unknown) {
    throw convertPrismaError(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const user = prisma.user.delete({ where: { id } });

    return user;
  } catch (error: unknown) {
    throw convertPrismaError(error);
  }
}
