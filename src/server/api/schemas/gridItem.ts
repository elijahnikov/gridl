import { z } from "zod";

export const createGridItemSchema = z.object({
  name: z.string().optional(),
  gridSlug: z.string(),
  url: z.string().optional(),
  text: z.string().optional(),
  type: z.enum(["text", "social", "music", "url"]),
  slug: z.string(),
  bgColor: z.string().optional(),
  x: z.number(),
  y: z.number(),
  h: z.number(),
  w: z.number(),
});
