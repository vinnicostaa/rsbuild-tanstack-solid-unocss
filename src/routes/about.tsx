import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/about")({
  component: About,
});

const SYSTEM_ITEMS = ["Solid", "TanStack", "Rsbuild", "UnoCSS + Kobalte"];

function About() {
  return (
    <main class="page-wrap px-4 py-12">
      <section class="island-shell rounded-2xl p-6 sm:p-8">
        <p class="island-kicker mb-2">Sistema</p>
        <h1 class="display-title mb-3 text-4xl font-bold sm:text-5xl">
          Base reutilizável para interfaces modernas e temáveis.
        </h1>
        <p class="page-copy m-0 max-w-3xl text-base leading-8">
          O projeto usa Solid, TanStack Router, Rsbuild, UnoCSS e Kobalte para
          servir como ponto de partida enxuto, com tokens centralizados, temas
          em OKLCH e componentes preparados para evolução por projeto.
        </p>

        <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEM_ITEMS.map((item) => (
            <article class="feature-card rounded-lg p-4">
              <h2 class="m-0 text-sm font-semibold">{item}</h2>
              <p class="feature-card-description m-0 mt-2 text-sm leading-[1.45]">
                Mantido enxuto para evoluir o produto sem carregar estética de
                template.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
