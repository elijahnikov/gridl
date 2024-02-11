import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ipAddress } from "@vercel/edge";
import { ratelimit } from "@/utils/ratelimit";
import { TRPCError } from "@trpc/server";
import type { Geo, UserAgent } from "@/app/api/trpc/[trpc]/route";

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
});
