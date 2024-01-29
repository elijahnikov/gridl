import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ipAddress } from "@vercel/edge";

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
  getTags: publicProcedure.query(async ({ ctx }) => {
    // const currentUserId = ctx.session.user.id;
    // console.log(1, ctx.req?.ip, ctx.geolocation);
    // if (!currentUserId) {
    //   throw new TRPCError({ code: "UNAUTHORIZED" });
    // }
    const ip2 = ipAddress(ctx.req as Request) ?? "unknown";
    const ip = (ctx.req?.headers.get("x-forwarded-for") ?? "127.0.0.1").split(
      ",",
    )[0];
    return {
      ip,
      ip2,
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
