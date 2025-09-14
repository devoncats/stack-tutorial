import { Prisma } from "@/generated/prisma";
import { DatabaseError } from "@/lib/errors";

export function convertPrismaError(error: unknown): DatabaseError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2000":
        return new DatabaseError("Value too long for a column", error.code);
      case "P2002":
        return new DatabaseError(
          `Unique constraint failed on fields: ${error.meta?.target}`,
          error.code,
        );
      case "P2003":
        return new DatabaseError("Foreign key constraint failed", error.code);
      case "P2004":
        return new DatabaseError(
          "A constraint failed on the database",
          error.code,
        );
      case "P2005":
        return new DatabaseError(
          "Invalid value stored in the database for a field",
          error.code,
        );
      case "P2006":
        return new DatabaseError(
          "Invalid value provided for a field",
          error.code,
        );
      case "P2007":
        return new DatabaseError("Data validation error", error.code);
      case "P2025":
        return new DatabaseError("Record not found", error.code);
      case "P2033":
        return new DatabaseError(
          "Number out of range for the field type",
          error.code,
        );
      case "P2036":
        return new DatabaseError("Too many database connections", error.code);
      default:
        return new DatabaseError(
          `Unhandled Prisma error: ${error.code}`,
          error.code,
        );
    }
  }

  return new DatabaseError("Unknown database error");
}
