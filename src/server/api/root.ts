import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { gridRouter } from "./routers/grid";
import { gridItemRouter } from "./routers/gridItem";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  grid: gridRouter,
  gridItem: gridItemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
