import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import type { QueryClient } from "@tanstack/solid-query";
import { Suspense } from "solid-js";

import Header from "../components/ui/header";

/** Contexto global injetado em todas as rotas via `context.queryClient`. */
export interface AppRouterContext {
  auth: null;
  queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<AppRouterContext>()({
  head: () => ({
    meta: [
      {
        title: "Frontend Boilerplate",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Suspense>
        <Header />
        <Outlet />
      </Suspense>
    </>
  );
}
