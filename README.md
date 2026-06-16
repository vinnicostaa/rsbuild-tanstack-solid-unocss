# Frontend Boilerplate

Boilerplate frontend para projetos modernos com **Solid**, **TanStack Router**, **Rsbuild**, **UnoCSS**, **Kobalte** e uma arquitetura de **design tokens em OKLCH**.

A proposta é servir como uma base neutra, reutilizável e fácil de adaptar para diferentes produtos, sem acoplar a identidade visual a uma marca específica.

## Stack

- **Solid** — UI reativa e leve.
- **TanStack Router** — roteamento tipado com geração de route tree.
- **TanStack Query** — camada pronta para cache e server state.
- **Rsbuild** — build/dev server baseado em Rspack.
- **UnoCSS** — atomic CSS com shortcuts e tokens centralizados.
- **Kobalte** — primitives acessíveis e integração de color mode.
- **Class Variance Authority** — variantes tipadas para componentes.
- **Biome** — configuração de lint/format.
- **Bun** — runtime/package manager usado pelo projeto.

## Requisitos

- Bun instalado.
- Node/Bun compatível com o ecossistema Vite/Rsbuild moderno.

Instale dependências com:

```bash
bun install
```

## Scripts

```bash
bun run dev
```

Inicia o ambiente de desenvolvimento com Rsbuild.

```bash
bun run build
```

Gera o build de produção em `dist/`.

```bash
bun run preview
```

Serve o build gerado para inspeção local.

## Estrutura principal

```txt
.
├── docs/
│   └── theming.md
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── header.tsx
│   │       └── toast.tsx
│   ├── lib/
│   │   ├── query-client.ts
│   │   └── utils.ts
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── about.tsx
│   │   └── index.tsx
│   ├── index.tsx
│   ├── main.css
│   └── routeTree.gen.ts
├── rsbuild.config.ts
├── uno.config.ts
├── biome.json
└── package.json
```

## Theming e design tokens

A base visual fica em `src/main.css` e segue uma arquitetura em camadas:

```txt
reference tokens → system tokens → component tokens → compatibility aliases
```

### Camadas

```css
--ui-ref-*   /* valores crus: paleta, fontes, radius */
--ui-sys-*   /* papéis semânticos globais */
--ui-comp-*  /* contratos visuais específicos de componente */
```

Também existem aliases de compatibilidade para ergonomia com UnoCSS/shadcn-like APIs:

```css
--background
--foreground
--primary
--muted
--accent
--border
--ring
--danger
--destructive
```

Isso permite continuar escrevendo componentes com classes legíveis:

```tsx
<div class="bg-background text-foreground border-border" />
```

Enquanto a fonte da verdade continua nas camadas `--ui-*`.

A documentação completa fica em:

```txt
docs/theming.md
```

## Paleta

O tema padrão usa uma direção visual **carbon / graphite / platinum**, com autoria em **OKLCH**:

```css
oklch(...)
oklch(... / alpha)
color-mix(in oklch, ...)
```

O build pode transformar OKLCH em `lab()` ou fallbacks no CSS final. A regra de autoria continua sendo OKLCH no código-fonte.

## Dark mode

O projeto usa o color mode do Kobalte e mantém compatibilidade com os dois seletores:

```css
.dark,
[data-kb-theme="dark"] {
  color-scheme: dark;
}
```

O script/provider ficam em `src/index.tsx`:

```tsx
<ColorModeScript initialColorMode="dark" />
<ColorModeProvider initialColorMode="dark">
  <App />
</ColorModeProvider>
```

## UnoCSS

A integração do UnoCSS acontece via PostCSS no `rsbuild.config.ts`:

```ts
postcss: (_config, { addPlugins }) => {
  addPlugins(UnoCSS(), { order: "pre" });
}
```

O tema, presets e shortcuts ficam em `uno.config.ts`.

Shortcuts principais:

- `site-header`
- `brand-pill`
- `brand-muted`
- `nav-link`
- `page-copy`
- `island-shell`
- `feature-card`
- `feature-card-description`
- `btn-primary`
- `btn-secondary`
- `field-control`

Os shortcuts principais usam tokens de componente `--ui-comp-*`, incluindo navegação, superfícies de página, cards, botões e campos.

## Componentes incluídos

### Header

Arquivo:

```txt
src/components/ui/header.tsx
```

Header simples com navegação usando TanStack Router.

### Toast

Arquivo:

```txt
src/components/ui/toast.tsx
```

Toast baseado em Kobalte, com variantes:

```ts
"default" | "success" | "error" | "warning" | "info" | "loading"
```

O toast consome tokens de componente e tokens semânticos de status.

## Rotas

As rotas ficam em:

```txt
src/routes
```

A route tree gerada fica em:

```txt
src/routeTree.gen.ts
```

O plugin do TanStack Router está configurado em `rsbuild.config.ts`.

## Convenções de tema

- Não usar hex direto em componentes.
- Não usar `rgb()` como formato autoral de tokens.
- Preferir OKLCH no código-fonte.
- Novos valores crus entram em `--ui-ref-*`.
- Papéis globais entram em `--ui-sys-*`.
- Contratos específicos de componente, wrapper ou superfície entram em `--ui-comp-*`.
- `danger` é o status canônico para erro/destrutivo.
- `destructive` existe como alias de compatibilidade.
- Sempre manter `.dark` e `[data-kb-theme="dark"]` juntos.

## Validação recomendada

Antes de abrir PR ou reutilizar a base em outro projeto:

```bash
bun run build
```

Também é recomendado verificar diagnostics/lint no editor.

## Personalização por projeto

Para adaptar a identidade visual, comece pela camada reference em `src/main.css`:

```css
:root {
  --ui-ref-color-platinum-50: oklch(...);
  --ui-ref-color-carbon-990: oklch(...);
}
```

Se quiser mudar o papel de uma cor no sistema:

```css
:root {
  --ui-sys-color-action-primary-bg: var(--ui-ref-color-blue-600);
}
```

Se quiser alterar apenas um componente:

```css
:root {
  --ui-comp-button-primary-bg: var(--ui-sys-color-action-primary-bg);
}
```

## Próximos passos possíveis

- Criar uma página interna de preview de tokens e componentes.
- Adicionar tokens explícitos para estados `disabled`, `active` e `selected`.
- Extrair tokens para `src/styles/tokens/*` quando a base crescer.
- Adicionar testes/lint scripts ao `package.json` quando o fluxo de qualidade for definido.
