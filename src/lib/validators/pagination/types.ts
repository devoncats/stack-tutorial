import type { z } from "zod";
import type { paginationSchema } from "@/lib/validators/pagination/schema";

export type PaginationInput = z.infer<typeof paginationSchema>;
export type PaginationOptions = {
  skip?: number;
  take?: number;
};
