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
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        info: "bg-info text-info-foreground hover:bg-info/90",
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
      class={cn(
        buttonVariants({ variant: local.variant, size: local.size }),
        local.class,
      )}
      disabled={local.disabled || local.loading}
      aria-busy={local.loading}
      {...others}
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
