import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/trpc/router/_app";

export type productsGetManyOutput =
  inferRouterOutputs<AppRouter>["products"]["getMany"];
