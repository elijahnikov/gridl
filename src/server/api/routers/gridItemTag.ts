import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const gridItemTagRouter = createTRPCRouter({
  //
  // CREATE: create tag
  //
  createTag: protectedProcedure
    .input(z.object({ label: z.string(), value: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;
      if (!currentUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const existingTag = await ctx.db.tag.findFirst({
        where: {
          label: input.label,
          value: input.value,
          userId: currentUserId,
        },
      });
      if (existingTag) {
        throw new TRPCError({ code: "CONFLICT" });
      }
      const tag = await ctx.db.tag.create({
        data: {
          ...input,
          userId: currentUserId,
        },
      });
      return tag;
    }),
  //
  // GET: get all tags for specific user
  //
  getTags: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.session.user.id;
    if (!currentUserId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const tags = await ctx.db.tag.findMany({
      where: {
        userId: currentUserId,
      },
      select: {
        label: true,
        value: true,
      },
    });
    return tags;
  }),
});
