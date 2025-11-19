import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/trpc/router/_app";

export type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];
