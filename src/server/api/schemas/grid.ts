import { z } from "zod";

export const createGridSchema = z.object({
  name: z.string(),
  bgImageUrl: z.string().optional(),
  bgColor: z.string().optional(),
  setDefault: z.boolean().optional().default(false),
});
