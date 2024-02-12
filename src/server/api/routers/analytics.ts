import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ipAddress } from "@vercel/edge";
import { ratelimit } from "@/utils/ratelimit";
import { TRPCError } from "@trpc/server";
import type { Geo, UserAgent } from "@/app/api/trpc/[trpc]/route";
import { subHours, subDays, subYears } from "date-fns";

export const interval = {
  "24 hours": subHours(Date.now(), 24),
  "7 days": subDays(Date.now(), 7),
  "30 days": subDays(Date.now(), 30),
  "1 year": subYears(Date.now(), 1),
  all: new Date(2023, 0, 1),
};

export const analyticsRouter = createTRPCRouter({
  //
  // CREATE: Register grid access
  //
  createGridAccessClick: publicProcedure
    .input(z.object({ gridId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const ip = ipAddress(ctx.req as Request) ?? "127.0.0.1";
      const { success } = await ratelimit().limit(ip);
      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }
      const { device, browser, isBot, os } = ctx.userAgent! as UserAgent;
      const { city, country, flag } = ctx.geolocation! as Geo;
      await ctx.db.gridClick.create({
        data: {
          // device
          deviceType: device.type ?? "PC",
          deviceModel: device.model,
          deviceVendor: device.vendor,
          // browser
          browser: browser.name,
          browserVersion: browser.version,
          // os
          os: os.name,
          osVersion: os.version,
          // bot
          isBot,
          // location
          city,
          country,
          flag,
          // grid
          gridId: input.gridId,
        },
      });
      return true;
    }),
  //
  // GET: get all clicks for specific grid
  //
  gridClicks: protectedProcedure
    .input(z.object({ slug: z.string(), dateRange: z.string() }))
    .query(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;
      const grid = await ctx.db.grid.findFirst({
        where: {
          slug: input.slug,
          userId: currentUserId,
        },
      });
      if (!grid) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      console.log({
        createdAt: {
          gte: new Date(),
          lte: interval[input.dateRange as keyof typeof interval],
        },
      });
      const groupedClicks = await ctx.db.gridClick.findMany({
        where: {
          gridId: grid.id,
          createdAt: {
            lte: new Date(),
            gte: interval[input.dateRange as keyof typeof interval],
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return groupedClicks;
    }),
});
