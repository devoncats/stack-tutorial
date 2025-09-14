import { paginationSchema } from "@/lib/validators/pagination/schema";

export function validatePagination(data: unknown) {
  return paginationSchema.safeParse(data);
}
