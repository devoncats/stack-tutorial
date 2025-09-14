import { type NextRequest, NextResponse } from "next/server";
import { DatabaseError, NotFoundError, ValidationError } from "@/lib/errors";
import { generateErrorResponse } from "@/lib/generate-error-response";
import { deletePost, getPost, updatePost } from "@/services/post.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const parsedId = Number.parseInt(id, 10);

    if (Number.isNaN(parsedId)) {
      throw new ValidationError("Invalid post ID");
    }

    const Post = await getPost(parsedId);

    if (!Post) {
      throw new NotFoundError("Post not found");
    }

    return NextResponse.json(
      {
        success: true,
        data: Post,
      },
      { status: 200 }
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const parsedId = Number.parseInt(id, 10);

    if (Number.isNaN(parsedId)) {
      throw new ValidationError("Invalid post ID");
    }

    const Post = await getPost(parsedId);

    if (!Post) {
      throw new NotFoundError("Post not found");
    }

    await deletePost(parsedId);

    return NextResponse.json(
      {
        success: true,
        message: "Post deleted successfully",
      },
      { status: 204 }
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const parsedId = Number.parseInt(id, 10);

    if (Number.isNaN(parsedId)) {
      throw new ValidationError("Invalid post ID");
    }

    const Post = await getPost(parsedId);

    if (!Post) {
      throw new NotFoundError("Post not found");
    }

    const updatedPost = await updatePost(parsedId, body);

    return NextResponse.json(
      {
        success: true,
        data: updatedPost,
        message: "Post updated successfully",
      },
      { status: 200 }
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
