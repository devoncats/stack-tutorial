import { afterEach, describe, expect, it, vi } from "vitest";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import type { CreatePostInput } from "@/lib/validators/post/types";
import {
  createPost,
  deletePost,
  getPost,
  listPosts,
  updatePost,
} from "@/services/post.service";

describe("Post Service", () => {
  afterEach(() => vi.clearAllMocks());

  it("List Posts return posts", async () => {
    const posts = [
      {
        id: 1,
        title: "Die Verwandlung",
        content:
          "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
        published: true,
        authorId: "cmfivd1xv000104l5hkcq6pkp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const total = 1;

    const mockTransaction = vi
      .spyOn(prisma, "$transaction")
      .mockResolvedValue([posts, total]);

    const result = await listPosts({ skip: 5, take: 10 });

    expect(result).toEqual({ data: posts, total });
    expect(mockTransaction).toHaveBeenCalledWith([
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "findMany",
          args: {
            skip: 5,
            take: 10,
            orderBy: { createdAt: "desc" },
          },
          model: "Post",
        }),
      }),
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "count",
          model: "Post",
        }),
      }),
    ]);
  });

  it("List Posts with default pagination", async () => {
    const posts = [
      {
        id: 1,
        title: "Die Verwandlung",
        content:
          "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
        published: true,
        authorId: "cmfivd1xv000104l5hkcq6pkp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const total = 1;

    const mockTransaction = vi
      .spyOn(prisma, "$transaction")
      .mockResolvedValue([posts, total]);

    const result = await listPosts({});

    expect(result).toEqual({ data: posts, total });
    expect(mockTransaction).toHaveBeenCalledWith([
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "findMany",
          args: {
            skip: 0,
            take: 10,
            orderBy: { createdAt: "desc" },
          },
          model: "Post",
        }),
      }),
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "count",
          model: "Post",
        }),
      }),
    ]);
  });

  it("List Posts handles database errors", async () => {
    const mockTransaction = vi
      .spyOn(prisma, "$transaction")
      .mockRejectedValue(new Error("Unknown database error"));

    await expect(listPosts({})).rejects.toThrow("Unknown database error");
    expect(mockTransaction).toHaveBeenCalledWith([
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "findMany",
          args: {
            skip: 0,
            take: 10,
            orderBy: { createdAt: "desc" },
          },
          model: "Post",
        }),
      }),
      expect.objectContaining({
        spec: expect.objectContaining({
          action: "count",
          model: "Post",
        }),
      }),
    ]);
  });

  it("Create Post successfully", async () => {
    const userInput = {
      title: "Die Verwandlung",
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    const createdPost = {
      id: 1,
      ...userInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockCreate = vi
      .spyOn(prisma.post, "create")
      .mockResolvedValue(createdPost);

    const result = await createPost(userInput);
    expect(result).toEqual(createdPost);
    expect(mockCreate).toHaveBeenCalledWith({ data: userInput });
  });

  it("Create Post handles database errors", async () => {
    const postInput = {
      title: "Die Verwandlung",
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    const mockCreate = vi
      .spyOn(prisma.post, "create")
      .mockRejectedValue(new Error("Unknown database error"));

    await expect(createPost(postInput)).rejects.toThrow(
      "Unknown database error"
    );
    expect(mockCreate).toHaveBeenCalledWith({ data: postInput });
  });

  it("Create Post with missing values handles database errors", async () => {
    const postInput = {
      title: "",
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    const mockCreate = vi.spyOn(prisma.post, "create").mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError("Invalid data format", {
        code: "P2007",
        clientVersion: "4.15.0",
      })
    );

    await expect(createPost(postInput)).rejects.toThrow(
      "Data validation error"
    );
    expect(mockCreate).toHaveBeenCalledWith({ data: postInput });
  });

  it("Get Post returns a post", async () => {
    const post = {
      id: 1,
      title: "Die Verwandlung",
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockFindUnique = vi
      .spyOn(prisma.post, "findUnique")
      .mockResolvedValue(post);

    const result = await getPost(1);

    expect(result).toEqual(post);
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("Get Post handles database errors", async () => {
    const mockFindUnique = vi
      .spyOn(prisma.post, "findUnique")
      .mockRejectedValue(new Error("Unknown database error"));

    await expect(getPost(1)).rejects.toThrow("Unknown database error");
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("Update Post successfully", async () => {
    const updateData: Partial<CreatePostInput> = {
      title: "Die Verwandlung - Updated",
    };

    const updatedPost = {
      id: 1,
      title: "Die Verwandlung - Updated",
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUpdate = vi
      .spyOn(prisma.post, "update")
      .mockResolvedValue(updatedPost);

    const result = await updatePost(1, updateData);
    expect(result).toEqual(updatedPost);
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    });
  });

  it("Update Post handles database errors", async () => {
    const updateData: Partial<CreatePostInput> = {
      title: "Die Verwandlung - Updated",
    };

    const mockUpdate = vi
      .spyOn(prisma.post, "update")
      .mockRejectedValue(new Error("Unknown database error"));
    await expect(updatePost(1, updateData)).rejects.toThrow(
      "Unknown database error"
    );
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    });
  });

  it("Delete Post successfully", async () => {
    const deletedPost = {
      id: 1,
      title: "Die Verwandlung",
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockDelete = vi
      .spyOn(prisma.post, "delete")
      .mockResolvedValue(deletedPost);

    const result = await deletePost(1);
    expect(result).toEqual(deletedPost);
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("Delete Post handles database errors", async () => {
    const mockDelete = vi
      .spyOn(prisma.post, "delete")
      .mockRejectedValue(new Error("Unknown database error"));

    await expect(deletePost(1)).rejects.toThrow("Unknown database error");
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
