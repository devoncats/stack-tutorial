import { prisma } from "@/lib/prisma";
import type { CreateUserInput, UpdateUserInput } from "@/validators/user/types";

export async function createUser(data: CreateUserInput) {
  return prisma.user.create({ data });
}

export async function getUser(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function listUsers({ skip = 0, take = 50 } = {}) {
  return prisma.user.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });
}

export async function updateUser(id: string, data: UpdateUserInput) {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}
