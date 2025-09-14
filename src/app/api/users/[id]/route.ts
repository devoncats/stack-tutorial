import { type NextRequest, NextResponse } from "next/server";
import { DatabaseError, NotFoundError, ValidationError } from "@/lib/errors";
import { generateErrorResponse } from "@/lib/generate-error-response";
import { deleteUser, getUser, updateUser } from "@/services/user.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const user = await getUser(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return generateErrorResponse(error, 400);
    }

    if (error instanceof NotFoundError) {
      return generateErrorResponse(error, 404);
    }

    if (error instanceof DatabaseError) {
      return generateErrorResponse(error, 500);
    }

    if (error instanceof Error) {
      return generateErrorResponse(error, 500);
    }

    return generateErrorResponse(new Error("Unknown Error"), 500);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const user = await getUser(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await deleteUser(id);

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
      },
      { status: 204 },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return generateErrorResponse(error, 400);
    }

    if (error instanceof NotFoundError) {
      return generateErrorResponse(error, 404);
    }

    if (error instanceof DatabaseError) {
      return generateErrorResponse(error, 500);
    }

    if (error instanceof Error) {
      return generateErrorResponse(error, 500);
    }

    return generateErrorResponse(new Error("Unknown Error"), 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const user = await getUser(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const updatedUser = await updateUser(id, body);

    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
        message: "User updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return generateErrorResponse(error, 400);
    }

    if (error instanceof NotFoundError) {
      return generateErrorResponse(error, 404);
    }

    if (error instanceof DatabaseError) {
      return generateErrorResponse(error, 500);
    }

    if (error instanceof Error) {
      return generateErrorResponse(error, 500);
    }

    return generateErrorResponse(new Error("Unknown Error"), 500);
  }
}
