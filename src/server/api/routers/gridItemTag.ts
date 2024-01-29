import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const gridItemTagRouter = createTRPCRouter({
  //
  // CREATE: create tag
  //
  createTag: protectedProcedure
    .input(z.object({ text: z.string(), bgColor: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingTag = await ctx.db.gridItemTag.findFirst({
        where: {
          text: input.text,
        },
      });
      if (existingTag) {
        throw new TRPCError({ code: "CONFLICT" });
      }
      await ctx.db.gridItemTag.create({
        data: {
          ...input,
        },
      });
    }),
  //
  // GET: get all tags for specific user
  //
  getTags: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.session.user.id;
    console.log(1, ctx.req?.ip, ctx.geolocation);
    if (!currentUserId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return {
      ip: ctx.req?.ip,
      geo: ctx.geolocation,
    };
    // const tags = await ctx.db.gridItemTag.findMany({
    //   where: {
    //     userId: currentUserId,
    //   },
    // });
    // return tags;
  }),
});
