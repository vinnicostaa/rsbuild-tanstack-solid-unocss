import {
  ColorModeProvider,
  ColorModeScript,
  useColorMode,
} from "@kobalte/core";
import { TanStackDevtools } from "@tanstack/solid-devtools";
import { FormDevtools } from "@tanstack/solid-form-devtools";
import { QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtoolsPanel } from "@tanstack/solid-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/solid-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/solid-router-devtools";
import { createEffect, Show } from "solid-js";
import { render } from "solid-js/web";
import { Toaster } from "~/components/ui/toast";
import { queryClient } from "~/lib/query-client";
import { routeTree } from "~/routeTree.gen";
import "~/main.css";

const IS_DEV = !import.meta.env.PROD;

export function getRouter() {
  return createRouter({
    routeTree,
    context: { auth: null, queryClient },
    defaultPreload: "intent",
  });
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

const router = getRouter();

function ThemeSync() {
  const { colorMode } = useColorMode();
  createEffect(() => {
    document.documentElement.classList.toggle("dark", colorMode() === "dark");
  });
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeSync />
      <RouterProvider router={router} />
      <Show when={IS_DEV}>
        <TanStackDevtools
          config={{ hideUntilHover: true }}
          eventBusConfig={{ debug: true }}
          plugins={[
            {
              name: "TanStack Form",
              render: <FormDevtools theme="dark" devtoolsOpen={true} />,
              defaultOpen: true,
            },
            {
              name: "TanStack Query",
              render: <SolidQueryDevtoolsPanel />,
            },
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel router={router} />,
            },
          ]}
        />
      </Show>
    </QueryClientProvider>
  );
}

const root = document.getElementById("root");
if (root) {
  render(
    () => (
      <>
        <ColorModeScript initialColorMode="dark" />
        <ColorModeProvider initialColorMode="dark">
          <App />
          <Toaster position="top-right" />
        </ColorModeProvider>
      </>
    ),
    root,
  );
}
