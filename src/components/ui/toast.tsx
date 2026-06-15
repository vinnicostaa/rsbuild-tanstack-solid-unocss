import { Toast as ToastPrimitive, toaster } from "@kobalte/core/toast";
import { cva } from "class-variance-authority";
import type { JSX } from "solid-js";
import { Match, Show, Switch } from "solid-js";
import { Portal } from "solid-js/web";
import { cn } from "~/lib/utils";

type ToastVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastAction = {
  label: JSX.Element;
  onClick: () => void;
};

type ToastOptions = {
  description?: JSX.Element;
  duration?: number;
  persistent?: boolean;
  closeButton?: boolean;
  action?: ToastAction;
  class?: string;
};

type PromiseToastOptions<T, U = unknown> = {
  loading?: JSX.Element;
  success?: JSX.Element | ((data: T) => JSX.Element);
  error?: JSX.Element | ((error: U) => JSX.Element);
  description?: JSX.Element;
};

type ToasterProps = {
  position?: ToastPosition;
  duration?: number;
  limit?: number;
};

const toastVariants = cva(
  "relative grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 overflow-hidden w-full p-3.5 border border-border rounded-lg bg-overlay text-overlay-foreground pointer-events-auto outline-none shadow-[0_16px_40px_-24px_oklch(0_0_0_/_0.45),0_8px_20px_-16px_oklch(0_0_0_/_0.35)] focus-visible:shadow-[0_0_0_2px_var(--background),0_0_0_4px_var(--ring),0_16px_40px_-24px_oklch(0_0_0_/_0.45)] data-[opened]:animate-[app-toast-in_160ms_ease-out] data-[closed]:animate-[app-toast-out_140ms_ease-in_forwards] data-[swipe=move]:translate-x-[var(--kb-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=cancel]:duration-160 data-[swipe=cancel]:ease-out data-[swipe=end]:animate-[app-toast-swipe-out_120ms_ease-out_forwards]",
  {
    variants: {
      variant: {
        default: "",
        success:
          "border-[color-mix(in_oklch,var(--success)_32%,var(--border))]",
        error: "border-[color-mix(in_oklch,var(--danger)_32%,var(--border))]",
        warning:
          "border-[color-mix(in_oklch,var(--warning)_38%,var(--border))]",
        info: "border-[color-mix(in_oklch,var(--info)_32%,var(--border))]",
        loading: "border-[color-mix(in_oklch,var(--info)_32%,var(--border))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const toastIconWrapperVariants = cva(
  "grid place-items-center w-6 h-6 rounded-md bg-primary-subtle text-primary-subtle-foreground",
  {
    variants: {
      variant: {
        default: "",
        success: "bg-success-subtle text-success-subtle-foreground",
        error: "bg-danger-subtle text-danger-subtle-foreground",
        warning: "bg-warning-subtle text-warning-subtle-foreground",
        info: "bg-info-subtle text-info-subtle-foreground",
        loading: "bg-info-subtle text-info-subtle-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const toastIconVariants = cva("w-4 h-4", {
  variants: {
    variant: {
      default: "",
      success: "",
      error: "",
      warning: "",
      info: "",
      loading: "animate-[app-toast-spin_700ms_linear_infinite]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const toastContentVariants = cva("min-w-0 pr-1");

const toastTitleVariants = cva("text-sm font-semibold leading-[1.35]");

const toastDescriptionVariants = cva(
  "mt-1 text-muted-foreground text-[0.8125rem] leading-[1.45]",
);

const toastCloseVariants = cva(
  "inline-grid place-items-center w-7 h-7 -mt-1 -mr-1 rounded-md text-muted-foreground transition-colors duration-120 hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
);

const toastActionVariants = cva(
  "mt-2.5 px-2.5 py-1.5 rounded-md bg-secondary text-secondary-foreground text-[0.8125rem] font-semibold hover:bg-accent hover:text-accent-foreground",
);

const toastProgressTrackVariants = cva(
  "absolute right-0 bottom-0 left-0 h-0.5 bg-transparent",
);

const toastProgressFillVariants = cva(
  "h-full w-[var(--kb-toast-progress-fill-width)] bg-primary transition-[width] duration-250 linear",
  {
    variants: {
      variant: {
        default: "",
        success: "bg-success",
        error: "bg-danger",
        warning: "bg-warning",
        info: "bg-info",
        loading: "bg-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const toastRegionVariants = cva(
  "fixed z-9999 flex w-[min(100%-2rem,24rem)] pointer-events-none max-sm:left-4 max-sm:right-4 max-sm:w-auto max-sm:translate-x-0",
  {
    variants: {
      position: {
        "top-left": "top-4 left-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
        "bottom-right": "bottom-4 right-4",
      },
    },
    defaultVariants: {
      position: "top-right",
    },
  },
);

const toastListVariants = cva(
  "flex w-full flex-col gap-2.5 m-0 p-0 list-none outline-none",
);

const TOAST_ICONS: Record<ToastVariant, string> = {
  default: "i-lucide-bell",
  success: "i-lucide-circle-check",
  error: "i-lucide-circle-alert",
  warning: "i-lucide-triangle-alert",
  info: "i-lucide-info",
  loading: "i-lucide-loader-2",
};

function resolveContent<T>(
  content: JSX.Element | ((value: T) => JSX.Element),
  value: T,
) {
  return typeof content === "function" ? content(value) : content;
}

function ToastContent(props: {
  toastId: number;
  title: JSX.Element;
  variant?: ToastVariant;
  options?: ToastOptions;
}) {
  const variant = () => props.variant ?? "default";
  const showCloseButton = () => props.options?.closeButton ?? true;

  return (
    <ToastPrimitive
      toastId={props.toastId}
      duration={props.options?.duration}
      persistent={props.options?.persistent}
      class={cn(toastVariants({ variant: variant() }), props.options?.class)}
    >
      <div
        class={toastIconWrapperVariants({ variant: variant() })}
        aria-hidden="true"
      >
        <span
          class={cn(
            toastIconVariants({ variant: variant() }),
            TOAST_ICONS[variant()],
          )}
        />
      </div>

      <div class={toastContentVariants()}>
        <ToastPrimitive.Title class={toastTitleVariants()}>
          {props.title}
        </ToastPrimitive.Title>

        <Show when={props.options?.description}>
          <ToastPrimitive.Description class={toastDescriptionVariants()}>
            {props.options?.description}
          </ToastPrimitive.Description>
        </Show>

        <Show when={props.options?.action}>
          {(action) => (
            <button
              type="button"
              class={toastActionVariants()}
              onClick={() => {
                action().onClick();
                toaster.dismiss(props.toastId);
              }}
            >
              {action().label}
            </button>
          )}
        </Show>
      </div>

      <Show when={showCloseButton()}>
        <ToastPrimitive.CloseButton
          class={toastCloseVariants()}
          aria-label="Fechar"
        >
          <span class="i-lucide-x size-4" aria-hidden="true" />
        </ToastPrimitive.CloseButton>
      </Show>

      <ToastPrimitive.ProgressTrack class={toastProgressTrackVariants()}>
        <ToastPrimitive.ProgressFill
          class={toastProgressFillVariants({ variant: variant() })}
        />
      </ToastPrimitive.ProgressTrack>
    </ToastPrimitive>
  );
}

function show(title: JSX.Element, options?: ToastOptions) {
  return toaster.show((props) => (
    <ToastContent toastId={props.toastId} title={title} options={options} />
  ));
}

function typedToast(
  variant: ToastVariant,
  title: JSX.Element,
  options?: ToastOptions,
) {
  return toaster.show((props) => (
    <ToastContent
      toastId={props.toastId}
      title={title}
      variant={variant}
      options={options}
    />
  ));
}

function promise<T, U = unknown>(
  task: Promise<T> | (() => Promise<T>),
  options: PromiseToastOptions<T, U> = {},
) {
  return toaster.promise<T, U>(task, (props) => (
    <Switch>
      <Match when={props.state === "pending"}>
        <ToastContent
          toastId={props.toastId}
          title={options.loading ?? "Carregando..."}
          variant="loading"
          options={{
            description: options.description,
            persistent: true,
            closeButton: false,
          }}
        />
      </Match>

      <Match when={props.state === "fulfilled"}>
        <ToastContent
          toastId={props.toastId}
          title={
            options.success
              ? resolveContent(options.success, props.data as T)
              : "Concluído"
          }
          variant="success"
          options={{ description: options.description }}
        />
      </Match>

      <Match when={props.state === "rejected"}>
        <ToastContent
          toastId={props.toastId}
          title={
            options.error
              ? resolveContent(options.error, props.error as U)
              : "Algo deu errado"
          }
          variant="error"
          options={{ description: options.description }}
        />
      </Match>
    </Switch>
  ));
}

export function Toaster(props: ToasterProps) {
  return (
    <Portal>
      <ToastPrimitive.Region
        class={toastRegionVariants({
          position: props.position ?? "top-right",
        })}
        duration={props.duration ?? 5000}
        limit={props.limit ?? 3}
        swipeDirection="right"
        pauseOnInteraction
        pauseOnPageIdle
      >
        <ToastPrimitive.List class={toastListVariants()} />
      </ToastPrimitive.Region>
    </Portal>
  );
}

export const toast = {
  show,
  success: (title: JSX.Element, options?: ToastOptions) =>
    typedToast("success", title, options),
  error: (title: JSX.Element, options?: ToastOptions) =>
    typedToast("error", title, options),
  warning: (title: JSX.Element, options?: ToastOptions) =>
    typedToast("warning", title, options),
  info: (title: JSX.Element, options?: ToastOptions) =>
    typedToast("info", title, options),
  loading: (title: JSX.Element, options?: ToastOptions) =>
    typedToast("loading", title, { persistent: true, ...options }),
  promise,
  dismiss: toaster.dismiss,
  clear: toaster.clear,
};
