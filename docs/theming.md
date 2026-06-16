# Theming e design tokens

Este boilerplate usa uma arquitetura de tokens em camadas, com CSS custom properties em `src/main.css` e integração com UnoCSS via aliases compatíveis com classes como `bg-background`, `text-foreground` e `border-border`.

A estrutura foi alinhada com padrões vistos em sistemas oficiais como Carbon, Fluent e Polaris, além da terminologia do Design Tokens Community Group.

## Objetivos

- Ser reutilizável por vários projetos, sem namespace de marca específica.
- Manter OKLCH como formato canônico no código-fonte.
- Separar valores crus, decisões semânticas, decisões de componente e aliases de compatibilidade.
- Permitir troca de tema sem reescrever componentes.
- Manter compatibilidade com UnoCSS, Kobalte e APIs shadcn-like.

## Camadas

### 1. Reference tokens

Prefixo:

```css
--ui-ref-*
```

Reference tokens guardam valores crus da paleta, fontes e radius. Eles são a matéria-prima do tema e não devem ser usados diretamente em componentes.

Exemplos:

```css
--ui-ref-color-platinum-50: oklch(98.2% 0.003 250);
--ui-ref-color-carbon-990: oklch(8.5% 0.004 255);
--ui-ref-color-red-600: oklch(52% 0.12 25);
--ui-radius-base: 0.5rem;
```

Use essa camada quando precisar introduzir um novo valor base reutilizável.

### 2. System tokens

Prefixo:

```css
--ui-sys-*
```

System tokens descrevem papéis semânticos globais, como fundo, texto, borda, foco, ações e status.

Exemplos:

```css
--ui-sys-color-bg-canvas: var(--ui-ref-color-platinum-50);
--ui-sys-color-fg-default: var(--ui-ref-color-carbon-970);
--ui-sys-color-border-default: var(--ui-ref-color-platinum-600);
--ui-sys-color-action-primary-bg: var(--ui-ref-color-carbon-950);
--ui-sys-color-status-danger-bg: var(--ui-ref-color-red-600);
```

Use essa camada para decisões globais de produto ou tema.

### 3. Component tokens

Prefixo:

```css
--ui-comp-*
```

Component tokens são hooks específicos de componente. Eles podem apontar para system tokens, mas dão liberdade para refinar um componente sem alterar o sistema inteiro.

Exemplos:

```css
--ui-comp-navbar-bg: oklch(98.2% 0.003 250 / 0.9);
--ui-comp-page-title-fg: var(--ui-sys-color-fg-default);
--ui-comp-button-primary-bg: var(--ui-sys-color-action-primary-bg);
--ui-comp-form-field-border: var(--ui-sys-color-border-input);
--ui-comp-input-border: var(--ui-sys-color-border-input);
--ui-comp-toast-border: var(--ui-sys-color-border-default);
```

Use essa camada quando um componente, wrapper ou superfície existente precisar de contrato visual próprio, especialmente se tiver estados como hover, active, disabled, selected, invalid ou loading.

### 4. Compatibility aliases

Aliases mantêm a API atual confortável para UnoCSS e componentes shadcn-like.

Exemplos:

```css
--background: var(--ui-sys-color-bg-canvas);
--foreground: var(--ui-sys-color-fg-default);
--primary: var(--ui-sys-color-action-primary-bg);
--border: var(--ui-sys-color-border-default);
--destructive: var(--danger);
```

Esses tokens existem para consumo externo e ergonomia de classes:

```tsx
<div class="bg-background text-foreground border-border" />
```

Não trate essa camada como fonte da verdade do design system.

## Dark mode

Kobalte sincroniza dark mode usando `.dark` e `[data-kb-theme="dark"]`. O CSS deve sempre suportar ambos:

```css
.dark,
[data-kb-theme="dark"] {
  color-scheme: dark;
  --ui-sys-color-bg-canvas: var(--ui-ref-color-carbon-990);
  --ui-sys-color-fg-default: var(--ui-ref-color-platinum-100);
}
```

O dark mode deve sobrescrever principalmente `--ui-sys-*` e, quando necessário, `--ui-comp-*`. Os aliases públicos atualizam automaticamente porque apontam para essas camadas.

## OKLCH

No código-fonte, prefira:

```css
oklch(...)
oklch(... / alpha)
color-mix(in oklch, ...)
```

Exemplos:

```css
--ui-ref-color-carbon-990: oklch(8.5% 0.004 255);
--ui-comp-navbar-bg: oklch(98.2% 0.003 250 / 0.9);
--ui-sys-color-action-primary-bg-subtle: color-mix(
  in oklch,
  var(--ui-sys-color-action-primary-bg) 8%,
  transparent
);
```

Observação: o build pode transformar OKLCH em `lab()` ou fallback hexadecimal no CSS final. Isso é normal. A regra de autoria continua sendo OKLCH no código-fonte.

## Status colors

O vocabulário canônico do boilerplate é:

```txt
success
info
warning
danger
```

`destructive` existe apenas como alias de compatibilidade com ecossistemas shadcn-like:

```css
--danger: var(--ui-sys-color-status-danger-bg);
--destructive: var(--danger);
```

Ao criar novos componentes, prefira `danger` internamente.

## Regras práticas

1. Não use hex ou `rgb()` direto em componentes.
2. Não crie tokens soltos como `--my-card-color` fora da hierarquia.
3. Valores crus entram em `--ui-ref-*`.
4. Decisões globais entram em `--ui-sys-*`.
5. Decisões específicas de componente entram em `--ui-comp-*`.
6. Classes públicas podem continuar usando aliases como `bg-background`, `text-muted-foreground` e `border-border`.
7. Estados recorrentes devem ser explícitos: `hover`, `active`, `selected`, `disabled`, `focus`, `invalid` e `loading`.
8. Component tokens não devem ser usados por componentes diferentes daquele contrato.
9. Antes de alterar contraste de texto, fundo, borda ou foco, valide acessibilidade visual.
10. Mantenha `.dark` e `[data-kb-theme="dark"]` juntos.

## Como customizar para um projeto

Para adaptar a identidade visual de um produto, comece pela camada reference:

```css
:root {
  --ui-ref-color-platinum-50: oklch(...);
  --ui-ref-color-carbon-990: oklch(...);
  --ui-ref-color-blue-600: oklch(...);
}
```

Se o papel semântico mudar, ajuste a camada system:

```css
:root {
  --ui-sys-color-action-primary-bg: var(--ui-ref-color-blue-600);
}
```

Se apenas um componente precisa mudar, ajuste a camada component:

```css
:root {
  --ui-comp-button-primary-bg: var(--ui-sys-color-action-primary-bg);
  --ui-comp-button-primary-hover-bg: color-mix(
    in oklch,
    var(--ui-sys-color-action-primary-bg) 86%,
    var(--ui-ref-color-black)
  );
}
```

## Alinhamento com referências oficiais

Referências consultadas:

- Design Tokens Community Group — define conceitos como token, grupo, tipo, alias/reference, metadata e interoperabilidade entre ferramentas.
- Carbon Design System — separa core tokens e component tokens; reforça que component tokens são específicos do componente e não globais.
- Fluent 2 — descreve global tokens e alias tokens, com aliases dando significado semântico aos valores crus.
- Polaris — usa tokens semânticos detalhados para background, surface, fill, text, border, icon e estados como hover/active/disabled.

Decisões derivadas dessas referências:

- `--ui-ref-*` corresponde à ideia de global/reference tokens.
- `--ui-sys-*` corresponde à ideia de semantic/alias tokens.
- `--ui-comp-*` corresponde à ideia de component tokens.
- Aliases como `--background`, `--primary` e `--destructive` são adapters de compatibilidade, não fonte canônica.
- Estados de UI devem crescer como tokens explícitos, não como cores hardcoded no componente.

## Próximos passos possíveis

- Extrair tokens para arquivos em `src/styles/tokens/*` quando o tema crescer.
- Gerar tokens a partir de `.tokens.json` se houver integração futura com design tools.
- Adicionar tokens explícitos para estados `disabled`, `active`, `selected` e validação de input.
- Adicionar uma página interna de preview de tokens/componentes.
