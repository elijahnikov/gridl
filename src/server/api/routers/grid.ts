import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createGridSchema, updateGridSchema } from "../schemas/grid";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ratelimit } from "@/utils/ratelimit";
import { ipAddress } from "@vercel/edge";

export const gridRouter = createTRPCRouter({
  //
  // CREATE: Grid
  //
  createGrid: protectedProcedure
    .input(createGridSchema)
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;

      const ip = ipAddress(ctx.req as Request) ?? "127.0.0.1";
      const { success } = await ratelimit().limit(ip);
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
  grids: protectedProcedure
    .input(
      z.object({
        orderBy: z.string().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const grids = await ctx.db.grid.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        take: input.limit ? input.limit : undefined,
        orderBy: input.orderBy
          ? { [input.orderBy]: "asc" }
          : [
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
    .input(z.object({ slug: z.string(), sortOrder: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;
      const grid = await ctx.db.grid.findFirst({
        where: {
          slug: input.slug,
          userId: currentUserId,
        },
        include: {
          gridItems: {
            include: {
              _count: {
                select: {
                  itemClicks: true,
                },
              },
            },
          },
        },
      });
      if (!grid) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      if (currentUserId !== grid.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return grid;
    }),
  //
  // READ: Get specific grid by id for viewing
  //
  gridForViewing: publicProcedure
    .input(z.object({ slug: z.string(), username: z.string() }))
    .query(async ({ ctx, input }) => {
      const { slug, username } = input;
      const grid = await ctx.db.grid.findFirst({
        where: {
          slug,
          user: {
            name: username,
          },
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
    .mutation(async ({ ctx, input }) => {
      const ip = ipAddress(ctx.req as Request) ?? "unknown";
      const { success } = await ratelimit().limit(ip);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const existingDefault = await ctx.db.grid.findFirst({
        where: {
          id: input.id,
          default: true,
        },
      });

      if (existingDefault) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "This grid is already your default grid!",
        });
      }

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
  //
  // UPDATE: Update grid look and feel
  //
  updateGrid: protectedProcedure
    .input(updateGridSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      const currentUser = ctx.session.user;
      await ctx.db.grid.update({
        where: {
          id,
          userId: currentUser.id,
        },
        data: {
          ...rest,
        },
      });
    }),
});
