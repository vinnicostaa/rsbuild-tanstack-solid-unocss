import * as DialogPrimitive from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.CloseButton;

const DialogPortal: Component<DialogPrimitive.DialogPortalProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);

  return (
    <DialogPrimitive.Portal {...others}>
      <div class="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
        {local.children}
      </div>
    </DialogPrimitive.Portal>
  );
};

type DialogOverlayProps<T extends ValidComponent = "div"> =
  DialogPrimitive.DialogOverlayProps<T> & {
    class?: string | undefined;
  };

const DialogOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogOverlayProps<T>>,
) => {
  const [local, others] = splitProps(props as DialogOverlayProps, ["class"]);

  return (
    <DialogPrimitive.Overlay
      class={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
        local.class,
      )}
      {...others}
    />
  );
};

type DialogContentProps<T extends ValidComponent = "div"> =
  DialogPrimitive.DialogContentProps<T> & {
    class?: string | undefined;
    children?: JSX.Element;
    hideCloseButton?: boolean;
    /** Renderiza o content dentro de DialogPortal + DialogOverlay. */
    portalled?: boolean;
    /** Controla o overlay quando `portalled` está habilitado. */
    showOverlay?: boolean;
  };

const DialogContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogContentProps<T>>,
) => {
  const [local, others] = splitProps(props as DialogContentProps, [
    "class",
    "children",
    "hideCloseButton",
    "portalled",
    "showOverlay",
  ]);

  const content = (
    <DialogPrimitive.Content
      class={cn(
        "fixed left-1/2 top-1/2 z-50 grid max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto border border-border bg-overlay p-6 text-overlay-foreground shadow-lg duration-200 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] sm:rounded-lg",
        local.class,
      )}
      {...others}
    >
      {local.children}

      {!local.hideCloseButton && (
        <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm text-muted-foreground opacity-70 ring-offset-background transition-opacity hover:text-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <span class="i-lucide-x size-4" aria-hidden="true" />
          <span class="sr-only">Fechar</span>
        </DialogPrimitive.CloseButton>
      )}
    </DialogPrimitive.Content>
  );

  if (local.portalled === false) {
    return content;
  }

  return (
    <DialogPortal>
      {local.showOverlay !== false && <DialogOverlay />}
      {content}
    </DialogPortal>
  );
};

const DialogHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        local.class,
      )}
      {...others}
    />
  );
};

const DialogFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-0 sm:space-x-2",
        local.class,
      )}
      {...others}
    />
  );
};

type DialogTitleProps<T extends ValidComponent = "h2"> =
  DialogPrimitive.DialogTitleProps<T> & {
    class?: string | undefined;
  };

const DialogTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, DialogTitleProps<T>>,
) => {
  const [local, others] = splitProps(props as DialogTitleProps, ["class"]);

  return (
    <DialogPrimitive.Title
      class={cn(
        "text-lg font-semibold leading-none tracking-tight",
        local.class,
      )}
      {...others}
    />
  );
};

type DialogDescriptionProps<T extends ValidComponent = "p"> =
  DialogPrimitive.DialogDescriptionProps<T> & {
    class?: string | undefined;
  };

const DialogDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, DialogDescriptionProps<T>>,
) => {
  const [local, others] = splitProps(props as DialogDescriptionProps, [
    "class",
  ]);

  return (
    <DialogPrimitive.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...others}
    />
  );
};

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
