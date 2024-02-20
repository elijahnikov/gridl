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
      const { success } = await ratelimit(1, "5 m").limit(ip);
      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }
      const { device, browser, isBot, os } = ctx.userAgent! as UserAgent;
      const { city, country, flag, countryRegion } = ctx.geolocation! as Geo;
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
          countryRegion,
          flag,
          // grid
          gridId: input.gridId,
        },
      });
      return true;
    }),
  //
  //  CREATE: Register grid link click
  //
  createGridLinkClick: publicProcedure
    .input(z.object({ gridItemId: z.string(), gridId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const ip = ipAddress(ctx.req as Request) ?? "127.0.0.1";
      const { success } = await ratelimit().limit(ip);
      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }
      const { device, browser, isBot, os } = ctx.userAgent! as UserAgent;
      const { city, country, flag, countryRegion } = ctx.geolocation! as Geo;
      await ctx.db.gridItemClick.create({
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
          countryRegion,
          flag,
          // grid
          gridId: input.gridId,
          // grid item
          gridItemId: input.gridItemId,
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
  //
  // GET: get grid item clicks by grid
  //
  gridItemClicksForGrid: protectedProcedure
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
      const result = (await ctx.db.$queryRaw`SELECT gi.url, COUNT(*) as count
      FROM "GridItemClick" gic
      JOIN "GridItem" gi ON gic."gridItemId" = gi.id
      WHERE gic."gridId" = ${grid.id}
      GROUP BY gi.url`) as { count: number; url: string }[];
      return result;
    }),
});
