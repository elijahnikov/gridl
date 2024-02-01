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
  //  GET: Get grid items for grid
  //
  gridItems: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const { slug } = input;
      const currentUser = ctx.session.user;
      const grid = await ctx.db.grid.findFirst({
        where: {
          slug: slug,
          user: {
            name: currentUser.name,
          },
        },
      });
      if (grid) {
        return await ctx.db.gridItem.findMany({
          where: {
            gridId: grid.id,
          },
          include: {
            _count: {
              select: {
                itemClicks: true,
              },
            },
          },
        });
      }
    }),
  //
  // CREATE: Create grid item for specific grid
  //
  createGridItem: protectedProcedure
    .input(createGridItemSchema)
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;

      const { success } = await ratelimit.limit("createGridItem");
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const { gridSlug, tags, ...rest } = input;

      const grid = await ctx.db.grid.findFirst({
        where: {
          slug: gridSlug,
          userId: currentUserId,
        },
      });
      const tagsString =
        tags && tags.length === 0
          ? null
          : tags?.map((tag) => tag.value).join(",");
      if (grid) {
        await ctx.db.gridItem.create({
          data: {
            tags: tagsString,
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
      const { gridItemId, tags, ...rest } = input;
      const tagsString =
        tags && tags.length === 0
          ? null
          : tags?.map((tag) => tag.value).join(",");
      await ctx.db.gridItem.update({
        where: {
          id: gridItemId,
        },
        data: {
          tags: tagsString,
          ...rest,
        },
      });
    }),
  //
  // UPDATE: Update many grid items
  //
  updateGridItems: protectedProcedure
    .input(z.object({}))
    .mutation(async ({ ctx, input }) => {
      return false;
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
