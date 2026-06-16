import * as ButtonPrimitive from "@kobalte/core/button";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { JSX, ValidComponent } from "solid-js";
import { Show, splitProps } from "solid-js";
import { cn } from "~/lib/utils";

/**
 * Variantes do Button centralizadas no CVA para evitar dependência de shortcuts
 * globais `btn-*` no UnoCSS. Isso mantém o primitive autocontido e previsível
 * para uso como button, link ou trigger polymorphic.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-80 disabled:[color:var(--ui-comp-button-disabled-fg)] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "[background-color:var(--ui-comp-button-primary-bg)] [color:var(--ui-comp-button-primary-fg)] hover:[background-color:var(--ui-comp-button-primary-hover-bg)] hover:[color:var(--ui-comp-button-primary-hover-fg)] disabled:[background-color:var(--ui-comp-button-disabled-bg)]",
        destructive:
          "[background-color:var(--ui-comp-button-danger-bg)] [color:var(--ui-comp-button-danger-fg)] hover:[background-color:var(--ui-comp-button-danger-hover-bg)] disabled:[background-color:var(--ui-comp-button-disabled-bg)]",
        outline:
          "border [border-color:var(--ui-comp-button-outline-border)] [background-color:var(--ui-comp-button-outline-bg)] [color:var(--ui-comp-button-outline-fg)] hover:[background-color:var(--ui-comp-button-outline-hover-bg)] hover:[color:var(--ui-comp-button-outline-hover-fg)] disabled:[border-color:var(--ui-comp-button-disabled-border)] disabled:[background-color:var(--ui-comp-button-disabled-bg)]",
        secondary:
          "border [border-color:var(--ui-comp-button-secondary-border)] [background-color:var(--ui-comp-button-secondary-bg)] [color:var(--ui-comp-button-secondary-fg)] hover:[background-color:var(--ui-comp-button-secondary-hover-bg)] hover:[color:var(--ui-comp-button-secondary-hover-fg)] disabled:[border-color:var(--ui-comp-button-disabled-border)] disabled:[background-color:var(--ui-comp-button-disabled-bg)]",
        ghost:
          "[color:var(--ui-comp-button-ghost-fg)] hover:[background-color:var(--ui-comp-button-ghost-hover-bg)] hover:[color:var(--ui-comp-button-ghost-hover-fg)]",
        link: "[color:var(--ui-comp-button-link-fg)] underline-offset-4 hover:[color:var(--ui-comp-button-link-hover-fg)] hover:underline",
        info: "[background-color:var(--ui-comp-button-info-bg)] [color:var(--ui-comp-button-info-fg)] hover:[background-color:var(--ui-comp-button-info-hover-bg)] disabled:[background-color:var(--ui-comp-button-disabled-bg)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8 text-lg",
        icon: "h-11 w-11 p-0",
        "icon-sm": "h-6 w-6 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps<T extends ValidComponent = "button"> =
  ButtonPrimitive.ButtonRootProps<T> &
    VariantProps<typeof buttonVariants> & {
      class?: string | undefined;
      children?: JSX.Element;
      /**
       * Quando `true`, força `disabled` + renderiza spinner inline antes do conteúdo.
       * Pattern big-tech (Stripe/Vercel): elimina ternário `{pending ? "Verificando..." : "X"}`
       * — feedback visual contínuo, texto pode trocar via `loadingText` se necessário.
       */
      loading?: boolean;
      /** Texto opcional exibido enquanto `loading` é true. Se ausente, mantém `children`. */
      loadingText?: string;
    };

const Button = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, ButtonProps<T>>,
) => {
  const [local, others] = splitProps(props as ButtonProps, [
    "variant",
    "size",
    "class",
    "loading",
    "loadingText",
    "children",
    "disabled",
  ]);
  return (
    <ButtonPrimitive.Root
      {...others}
      class={cn(
        buttonVariants({ variant: local.variant, size: local.size }),
        local.class,
      )}
      disabled={local.disabled || local.loading}
      aria-busy={local.loading}
    >
      <Show when={local.loading}>
        <span
          class="i-lucide-loader-2 size-4 animate-spin"
          aria-hidden="true"
          data-testid="button-spinner"
        />
      </Show>
      <Show when={local.loading && local.loadingText} fallback={local.children}>
        {local.loadingText}
      </Show>
    </ButtonPrimitive.Root>
  );
};

export type { ButtonProps };
export { Button, buttonVariants };
