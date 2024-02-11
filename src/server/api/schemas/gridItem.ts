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
  tags: z.object({ value: z.string(), label: z.string() }).array().optional(),
});

export const updateGridItemsSchema = z
  .object({
    id: z.string(),
    gridId: z.string(),
    bgColor: z.string().nullable(),
    h: z.number(),
    w: z.number(),
    x: z.number(),
    y: z.number(),
    name: z.string(),
    slug: z.string(),
    textColor: z.string().nullable(),
    text: z.string().nullable(),
    type: z.string(),
    url: z.string().nullable(),
  })
  .array();
