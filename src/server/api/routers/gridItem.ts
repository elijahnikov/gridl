import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createGridItemSchema } from "../schemas/gridItem";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "5 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export const gridItemRouter = createTRPCRouter({
  //
  // CREATE: Create grid item for specific grid
  //
  createGridItem: protectedProcedure
    .input(createGridItemSchema)
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;
      const { success } = await ratelimit.limit("createGridItem");
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      const { gridSlug, ...rest } = input;
      const grid = await ctx.db.grid.findFirst({
        where: {
          slug: gridSlug,
          userId: currentUserId,
        },
      });
      if (grid) {
        await ctx.db.gridItem.create({
          data: {
            gridId: grid.id,
            ...rest,
          },
        });
      }
    }),
  //
  // UPDATE: Update grid item
  //
  updateGridItem: protectedProcedure
    .input(
      createGridItemSchema
        .omit({ gridSlug: true })
        .extend({ gridItemId: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit("updateGridItem");
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      const { gridItemId, ...rest } = input;
      await ctx.db.gridItem.update({
        where: {
          id: gridItemId,
        },
        data: {
          ...rest,
        },
      });
    }),
  //
  // DELETE: Delete grid item
  //
  delete: protectedProcedure
    .input(z.object({ gridItemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.gridItem.delete({
        where: {
          id: input.gridItemId,
        },
      });
      return true;
    }),
});
