import { z } from "zod";

export const createGridSchema = z.object({
  name: z.string(),
  slug: z.string(),
  bgImageUrl: z.string().optional(),
  bgColor: z.string().optional(),
  default: z.boolean().optional().default(false),
});
