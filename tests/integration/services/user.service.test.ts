import { afterEach, describe, expect, it, vi } from "vitest";
import { prisma } from "@/lib/prisma";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "@/services/user.service";

describe("User Service", () => {
  afterEach(() => vi.clearAllMocks());

  it("List Users return users", async () => {
    const users = [
      {
        id: "cmfivd1xv000104l5hkcq6pkp",
        email: "devoncats.dev@outlook.com",
        name: "Gregorio Samsa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const total = 1;

    const mockTransaction = vi
      .spyOn(prisma, "$transaction")
      .mockResolvedValue([users, total]);

    const result = await listUsers({ skip: 5, take: 10 });

    expect(result).toEqual({ data: users, total });
    expect(mockTransaction).toHaveBeenCalledWith([
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "findMany",
          args: {
            skip: 5,
            take: 10,
            orderBy: { createdAt: "desc" },
          },
          model: "User",
        }),
      }),
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "count",
          model: "User",
        }),
      }),
    ]);
  });

  it("List Users with default pagination", async () => {
    const users = [
      {
        id: "cmfivd1xv000104l5hkcq6pkp",
        email: "devocats.dev@outlook.com",
        name: "Gregorio Samsa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const total = 1;

    const mockTransaction = vi
      .spyOn(prisma, "$transaction")
      .mockResolvedValue([users, total]);

    const result = await listUsers({});

    expect(result).toEqual({ data: users, total });
    expect(mockTransaction).toHaveBeenCalledWith([
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "findMany",
          args: {
            skip: 0,
            take: 10,
            orderBy: { createdAt: "desc" },
          },
          model: "User",
        }),
      }),
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "count",
          model: "User",
        }),
      }),
    ]);
  });

  it("List Users handles database errors", async () => {
    const mockTransaction = vi
      .spyOn(prisma, "$transaction")
      .mockRejectedValue(new Error("Database error"));

    await expect(listUsers({ skip: 0, take: 10 })).rejects.toThrow(
      "Unknown database error",
    );

    expect(mockTransaction).toHaveBeenCalledWith([
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "findMany",
          args: {
            skip: 0,
            take: 10,
            orderBy: { createdAt: "desc" },
          },
          model: "User",
        }),
      }),
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "count",
          model: "User",
        }),
      }),
    ]);
  });

  it("Create User successfully", async () => {
    const userInput = {
      email: "devoncats.dev@outlook.com",
      name: "Gregorio Samsa",
    };

    const createdUser = {
      id: "cmfivd1xv000104l5hkcq6pkp",
      ...userInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockCreate = vi
      .spyOn(prisma.user, "create")
      .mockResolvedValue(createdUser);

    const result = await createUser(userInput);
    expect(result).toEqual(createdUser);
    expect(mockCreate).toHaveBeenCalledWith({ data: userInput });
  });

  it("Create User handles database errors", async () => {
    const userInput = {
      email: "devoncats.dev@outlook.com",
      name: "Gregorio Samsa",
    };

    const mockCreate = vi
      .spyOn(prisma.user, "create")
      .mockRejectedValue(new Error("Database error"));

    await expect(createUser(userInput)).rejects.toThrow(
      "Unknown database error",
    );
    expect(mockCreate).toHaveBeenCalledWith({ data: userInput });
  });

  it("Get User by ID successfully", async () => {
    const userId = "cmfivd1xv000104l5hkcq6pkp";
    const foundUser = {
      id: userId,
      email: "devoncats.dev@outlook.com",
      name: "Gregorio Samsa",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockFindUnique = vi
      .spyOn(prisma.user, "findUnique")
      .mockResolvedValue(foundUser);

    const result = await getUser(userId);
    expect(result).toEqual(foundUser);
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: userId } });
  });

  it("Get User handles database errors", async () => {
    const userId = "cmfivd1xv000104l5hkcq6pkp";

    const mockFindUnique = vi
      .spyOn(prisma.user, "findUnique")
      .mockRejectedValue(new Error("Unknown database error"));
    await expect(getUser(userId)).rejects.toThrow("Unknown database error");
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: userId } });
  });

  it("Update User successfully", async () => {
    const userId = "cmfivd1xv000104l5hkcq6pkp";
    const updateData = { name: "Updated Name" };
    const updatedUser = {
      id: userId,
      email: "devoncats.dev@outlook.com",
      name: "Updated Name",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUpdate = vi
      .spyOn(prisma.user, "update")
      .mockResolvedValue(updatedUser);

    const result = await updateUser(userId, updateData);
    expect(result).toEqual(updatedUser);
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: userId },
      data: updateData,
    });
  });

  it("Update User handles database errors", async () => {
    const userId = "cmfivd1xv000104l5hkcq6pkp";
    const updateData = { name: "Updated Name" };

    const mockUpdate = vi
      .spyOn(prisma.user, "update")
      .mockRejectedValue(new Error("Unknown database error"));
    await expect(updateUser(userId, updateData)).rejects.toThrow(
      "Unknown database error",
    );
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: userId },
      data: updateData,
    });
  });

  it("Delete User successfully", async () => {
    const userId = "cmfivd1xv000104l5hkcq6pkp";
    const deletedUser = {
      id: userId,
      email: "devoncats.dev@outlook.com",
      name: "Gregorio Samsa",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockDelete = vi
      .spyOn(prisma.user, "delete")
      .mockResolvedValue(deletedUser);

    const result = await deleteUser(userId);
    expect(result).toEqual(deletedUser);
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: userId } });
  });

  it("Delete User handles database errors", async () => {
    const userId = "cmfivd1xv000104l5hkcq6pkp";

    const mockDelete = vi
      .spyOn(prisma.user, "delete")
      .mockRejectedValue(new Error("Unknown database error"));
    await expect(deleteUser(userId)).rejects.toThrow("Unknown database error");
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: userId } });
  });
});
