import { Link, createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: Home,
});

const STACK_ITEMS = [
  {
    title: "Solid + TanStack",
    description:
      "Roteamento, formulários e cache preparados para crescer sem acoplar UI ao domínio.",
  },
  {
    title: "UnoCSS + Rsbuild",
    description:
      "Build rápido com atomic CSS, shortcuts de projeto e tokens centralizados.",
  },
  {
    title: "Kobalte primitives",
    description:
      "Base acessível e headless para componentes reutilizáveis e temáveis.",
  },
];

function Home() {
  return (
    <main class={"page-wrap px-4 py-12"}>
      <section class={"island-shell rise-in rounded-2xl p-6 sm:p-8"}>
        <p class={"island-kicker mb-2"}>Frontend Boilerplate</p>
        <h1
          class={"display-title mb-3 max-w-3xl text-4xl font-bold sm:text-5xl"}
        >
          Base enxuta para interfaces modernas, acessíveis e temáveis.
        </h1>
        <p class={"page-copy m-0 max-w-3xl text-base leading-8"}>
          Um starter neutro para projetos Solid com TanStack Router, TanStack
          Form, UnoCSS, Rsbuild, Kobalte e uma arquitetura de tokens pronta para
          adaptação por produto.
        </p>

        <div class={"mt-8 flex flex-wrap gap-3"}>
          <Link to="/about" class={"btn-primary"}>
            Ver sistema
          </Link>
          <a
            href="https://tanstack.com/router/latest/docs/framework/solid/overview"
            target="_blank"
            rel="noreferrer"
            class={"btn-secondary"}
          >
            Documentação
          </a>
        </div>
      </section>

      <section class={"mt-4 grid gap-3 sm:grid-cols-3"}>
        {STACK_ITEMS.map((item) => (
          <article class={"feature-card rounded-lg p-4"}>
            <h2 class={"m-0 text-sm font-semibold"}>{item.title}</h2>
            <p
              class={"feature-card-description m-0 mt-2 text-sm leading-[1.45]"}
            >
              {item.description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
