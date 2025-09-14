import { type NextRequest, NextResponse } from "next/server";
import { DatabaseError, ValidationError } from "@/lib/errors";
import { generateErrorResponse } from "@/lib/generate-error-response";
import { getPaginationInfo } from "@/lib/get-pagination-info";
import { validatePagination } from "@/lib/validators/pagination/validator";
import { transformZodIssues } from "@/lib/validators/transform-zod-issues";
import { validateCreateUser } from "@/lib/validators/user/validator";
import { createUser, listUsers } from "@/services/user.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams);

    const { success, data, error } = validatePagination(params);

    if (!success) {
      throw new ValidationError(
        "Invalid pagination parameters",
        transformZodIssues(error),
      );
    }

    const { page, limit } = data;
    const skip = (page - 1) * limit;

    const { data: users, total } = await listUsers({ skip, take: limit });

    const pagination = getPaginationInfo(page, limit, total);

    return NextResponse.json(
      {
        success: true,
        data: users,
        pagination,
      },
      { status: 200 },
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
    const { success, data, error } = validateCreateUser(body);

    if (!success) {
      throw new ValidationError("Invalid user data", transformZodIssues(error));
    }

    const user = await createUser(data);

    return NextResponse.json(
      {
        success: true,
        data: user,
        message: "User created successfully",
      },
      { status: 201 },
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
