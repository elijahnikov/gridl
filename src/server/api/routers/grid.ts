import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/nodejs";
import { createGridSchema } from "../schemas/grid";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "5 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export const gridRouter = createTRPCRouter({
  //
  // CREATE: Grid
  //
  createGrid: protectedProcedure
    .input(createGridSchema)
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;

      const { success } = await ratelimit.limit("createGrid");
      if (!success)
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "You are doing that too often. Please try again later.",
        });

      const slugExists = await ctx.db.grid.findFirst({
        where: {
          slug: input.slug,
          userId: currentUserId,
        },
      });
      if (slugExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Slug already exists, please try with a different slug.",
        });
      }
      if (input.default) {
        await ctx.db.grid.updateMany({
          data: {
            default: false,
          },
        });
      }

      return await ctx.db.grid.create({
        data: {
          userId: currentUserId,
          columns: 0,
          ...input,
        },
        select: {
          name: true,
          createdAt: true,
        },
      });
    }),
  //
  // READ: All grids for current user
  //
  grids: protectedProcedure.query(async ({ ctx }) => {
    const grids = await ctx.db.grid.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: [
        {
          default: "desc",
        },
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        user: {
          select: {
            name: true,
          },
        },
        name: true,
        createdAt: true,
        slug: true,
        bgColor: true,
        default: true,
        bgImageUrl: true,
        _count: {
          select: {
            gridItems: true,
          },
        },
      },
    });
    return grids;
  }),
  //
  // READ: Get specific grid by id for editing,
  //
  gridForEditing: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;
      const grid = await ctx.db.grid.findFirst({
        where: {
          id: input.id,
          userId: currentUserId,
        },
        include: {
          gridItems: true,
        },
      });
      if (!grid) throw new TRPCError({ code: "NOT_FOUND" });
      if (currentUserId !== grid.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return grid;
    }),
  //
  // READ: Get specific grid by id for viewing
  //
  gridForViewing: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const grid = await ctx.db.grid.findFirst({
        where: {
          id: input.id,
        },
        include: {
          gridItems: true,
        },
      });
      if (!grid) throw new TRPCError({ code: "NOT_FOUND" });
      return grid;
    }),
  //
  // UPDATE: Set grid as defult
  //
  updateDefault: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit("updateDefault");
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      await ctx.db.$transaction([
        ctx.db.grid.updateMany({
          where: { default: true },
          data: { default: false },
        }),
        ctx.db.grid.update({
          where: {
            id: input.id,
          },
          data: {
            default: true,
          },
        }),
      ]);
      return true;
    }),
  //
  // DELETE: Delete grid by id
  //
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.grid.delete({
        where: {
          id: input.id,
        },
      });
      return true;
    }),
});
