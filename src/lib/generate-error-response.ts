import { NextResponse } from "next/server";
import { CustomError, DatabaseError } from "@/lib/errors";

export function generateErrorResponse(error: unknown, status = 500) {
  const message = error instanceof Error ? error.message : "Unknown error";

  return NextResponse.json(
    {
      success: false,
      message,
      details: error instanceof CustomError ? error.details : undefined,
      code: error instanceof DatabaseError ? error.code : undefined,
    },
    { status },
  );
}
