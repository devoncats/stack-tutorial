import { type NextRequest, NextResponse } from "next/server";
import { DatabaseError, ValidationError } from "@/lib/errors";
import { generateErrorResponse } from "@/lib/generate-error-response";
import { getPaginationInfo } from "@/lib/get-pagination-info";
import { validatePagination } from "@/lib/validators/pagination/validator";
import { validateCreatePost } from "@/lib/validators/post/validator";
import { transformZodIssues } from "@/lib/validators/transform-zod-issues";
import { createPost, listPosts } from "@/services/post.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams);

    const { success, data, error } = validatePagination(params);

    if (!success) {
      throw new ValidationError(
        "Invalid pagination parameters",
        transformZodIssues(error)
      );
    }

    const { page, limit } = data;
    const skip = (page - 1) * limit;

    const { data: posts, total } = await listPosts({ skip, take: limit });

    const pagination = getPaginationInfo(page, limit, total);

    return NextResponse.json(
      {
        success: true,
        data: posts,
        pagination,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return generateErrorResponse(error, 400);
    }

    if (error instanceof DatabaseError) {
      return generateErrorResponse(error, 500);
    }

    return generateErrorResponse(new Error("Unknown error occurred"), 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { success, data, error } = validateCreatePost(body);

    if (!success) {
      throw new ValidationError("Invalid post data", transformZodIssues(error));
    }

    const post = await createPost(data);

    return NextResponse.json(
      {
        success: true,
        data: post,
        message: "Post created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      generateErrorResponse(error, 400);
    }

    if (error instanceof DatabaseError) {
      return generateErrorResponse(error, 500);
    }

    return generateErrorResponse(new Error("Unknown error occurred"), 500);
  }
}
