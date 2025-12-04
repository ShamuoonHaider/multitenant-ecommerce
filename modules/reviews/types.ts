import { AppRouter } from "@/trpc/router/_app";
import { inferRouterOutputs } from "@trpc/server";

export type ReviewGetOneOutput =
  inferRouterOutputs<AppRouter>["reviews"]["getOne"];
