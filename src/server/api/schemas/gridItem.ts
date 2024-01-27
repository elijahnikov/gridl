import { z } from "zod";

export const createGridItemSchema = z.object({
  name: z.string(),
  gridSlug: z.string(),
  url: z.string().optional(),
  text: z.string().optional(),
  type: z.string(),
  slug: z.string(),
  bgColor: z.string().optional(),
  textColor: z.string().optional(),
  x: z.number(),
  y: z.number(),
  h: z.number(),
  w: z.number(),
});
