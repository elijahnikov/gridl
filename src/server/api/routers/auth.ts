import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      if (!email || !password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please supply all fields.",
        });
      }

      const existingUser = await ctx.db.user.findUnique({
        where: {
          email,
        },
        select: {
          email: true,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email is already taken.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await ctx.db.user.create({
        data: {
          name: email.split("@")[0],
          email,
          password: hashedPassword,
        },
        select: {
          email: true,
          createdAt: true,
        },
      });
    }),
  test: publicProcedure.mutation(async ({ ctx }) => {
    return {
      geolocation: ctx.geolocation.city,
    };
  }),
});
