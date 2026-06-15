import * as CheckboxPrimitive from "@kobalte/core/checkbox";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { cva, type VariantProps } from "class-variance-authority";
import type { ValidComponent } from "solid-js";
import { createContext, splitProps, useContext } from "solid-js";
import { cn } from "~/lib/utils";

const checkboxRootVariants = cva(
  "group flex items-start data-[disabled]:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "gap-2",
        default: "gap-2.5",
        lg: "gap-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const checkedVariantClasses = {
  default: [
    "data-[checked]:border-primary",
    "data-[checked]:bg-primary",
    "data-[checked]:text-primary-foreground",
    "data-[indeterminate]:border-primary",
    "data-[indeterminate]:bg-primary",
    "data-[indeterminate]:text-primary-foreground",
  ].join(" "),
  secondary: [
    "data-[checked]:border-secondary",
    "data-[checked]:bg-secondary",
    "data-[checked]:text-secondary-foreground",
    "data-[indeterminate]:border-secondary",
    "data-[indeterminate]:bg-secondary",
    "data-[indeterminate]:text-secondary-foreground",
  ].join(" "),
  success: [
    "data-[checked]:border-success",
    "data-[checked]:bg-success",
    "data-[checked]:text-success-foreground",
    "data-[indeterminate]:border-success",
    "data-[indeterminate]:bg-success",
    "data-[indeterminate]:text-success-foreground",
  ].join(" "),
  warning: [
    "data-[checked]:border-warning",
    "data-[checked]:bg-warning",
    "data-[checked]:text-warning-foreground",
    "data-[indeterminate]:border-warning",
    "data-[indeterminate]:bg-warning",
    "data-[indeterminate]:text-warning-foreground",
  ].join(" "),
  info: [
    "data-[checked]:border-info",
    "data-[checked]:bg-info",
    "data-[checked]:text-info-foreground",
    "data-[indeterminate]:border-info",
    "data-[indeterminate]:bg-info",
    "data-[indeterminate]:text-info-foreground",
  ].join(" "),
  danger: [
    "data-[checked]:border-danger",
    "data-[checked]:bg-danger",
    "data-[checked]:text-danger-foreground",
    "data-[indeterminate]:border-danger",
    "data-[indeterminate]:bg-danger",
    "data-[indeterminate]:text-danger-foreground",
  ].join(" "),
};

const checkboxControlVariants = cva(
  "grid shrink-0 place-items-center border bg-background text-transparent ring-offset-background transition-colors peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 data-[invalid]:border-danger data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  {
    variants: {
      variant: checkedVariantClasses,
      size: {
        sm: "size-3.5 rounded-sm",
        default: "size-4 rounded-sm",
        lg: "size-5 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const checkboxIndicatorVariants = cva("grid place-items-center text-current", {
  variants: {
    size: {
      sm: "size-3",
      default: "size-3.5",
      lg: "size-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const checkboxLabelVariants = cva(
  "font-medium leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 data-[invalid]:text-danger",
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const checkboxDescriptionVariants = cva(
  "leading-relaxed text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const checkboxErrorMessageVariants = cva("font-medium text-danger", {
  variants: {
    size: {
      sm: "text-xs",
      default: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type CheckboxVariants = VariantProps<typeof checkboxControlVariants>;
type CheckboxRootVariants = VariantProps<typeof checkboxRootVariants>;

type CheckboxVariantContextValue = {
  variant?: CheckboxVariants["variant"];
  size?: CheckboxVariants["size"];
};

const CheckboxVariantContext = createContext<() => CheckboxVariantContextValue>(
  () => ({}),
);

function useCheckboxVariants() {
  return useContext(CheckboxVariantContext)();
}

type CheckboxRootProps<T extends ValidComponent = "div"> =
  CheckboxPrimitive.CheckboxRootProps<T> &
    CheckboxVariants & {
      class?: string | undefined;
    };

const Checkbox = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CheckboxRootProps<T>>,
) => {
  const [local, others] = splitProps(props as CheckboxRootProps, [
    "class",
    "variant",
    "size",
  ]);

  return (
    <CheckboxVariantContext.Provider
      value={() => ({ variant: local.variant, size: local.size })}
    >
      <CheckboxPrimitive.Root
        class={cn(checkboxRootVariants({ size: local.size }), local.class)}
        {...others}
      />
    </CheckboxVariantContext.Provider>
  );
};

type CheckboxInputProps<T extends ValidComponent = "input"> =
  CheckboxPrimitive.CheckboxInputProps<T> & {
    class?: string | undefined;
  };

const CheckboxInput = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, CheckboxInputProps<T>>,
) => {
  const [local, others] = splitProps(props as CheckboxInputProps, ["class"]);

  return (
    <CheckboxPrimitive.Input class={cn("peer", local.class)} {...others} />
  );
};

type CheckboxControlProps<T extends ValidComponent = "div"> =
  CheckboxPrimitive.CheckboxControlProps<T> &
    CheckboxVariants & {
      class?: string | undefined;
    };

const CheckboxControl = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CheckboxControlProps<T>>,
) => {
  const variants = useCheckboxVariants();
  const [local, others] = splitProps(props as CheckboxControlProps, [
    "class",
    "variant",
    "size",
  ]);

  return (
    <CheckboxPrimitive.Control
      class={cn(
        checkboxControlVariants({
          variant: local.variant ?? variants.variant,
          size: local.size ?? variants.size,
        }),
        local.class,
      )}
      {...others}
    />
  );
};

type CheckboxIndicatorProps<T extends ValidComponent = "div"> =
  CheckboxPrimitive.CheckboxIndicatorProps<T> &
    Pick<CheckboxVariants, "size"> & {
      class?: string | undefined;
    };

const CheckboxIndicator = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CheckboxIndicatorProps<T>>,
) => {
  const variants = useCheckboxVariants();
  const [local, others] = splitProps(props as CheckboxIndicatorProps, [
    "class",
    "size",
  ]);

  return (
    <CheckboxPrimitive.Indicator
      class={cn(
        checkboxIndicatorVariants({ size: local.size ?? variants.size }),
        local.class,
      )}
      {...others}
    />
  );
};

type CheckboxLabelProps<T extends ValidComponent = "label"> =
  CheckboxPrimitive.CheckboxLabelProps<T> &
    CheckboxRootVariants & {
      class?: string | undefined;
    };

const CheckboxLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, CheckboxLabelProps<T>>,
) => {
  const variants = useCheckboxVariants();
  const [local, others] = splitProps(props as CheckboxLabelProps, [
    "class",
    "size",
  ]);

  return (
    <CheckboxPrimitive.Label
      class={cn(
        checkboxLabelVariants({ size: local.size ?? variants.size }),
        local.class,
      )}
      {...others}
    />
  );
};

type CheckboxDescriptionProps<T extends ValidComponent = "div"> =
  CheckboxPrimitive.CheckboxDescriptionProps<T> &
    CheckboxRootVariants & {
      class?: string | undefined;
    };

const CheckboxDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CheckboxDescriptionProps<T>>,
) => {
  const variants = useCheckboxVariants();
  const [local, others] = splitProps(props as CheckboxDescriptionProps, [
    "class",
    "size",
  ]);

  return (
    <CheckboxPrimitive.Description
      class={cn(
        checkboxDescriptionVariants({ size: local.size ?? variants.size }),
        local.class,
      )}
      {...others}
    />
  );
};

type CheckboxErrorMessageProps<T extends ValidComponent = "div"> =
  CheckboxPrimitive.CheckboxErrorMessageProps<T> &
    CheckboxRootVariants & {
      class?: string | undefined;
    };

const CheckboxErrorMessage = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CheckboxErrorMessageProps<T>>,
) => {
  const variants = useCheckboxVariants();
  const [local, others] = splitProps(props as CheckboxErrorMessageProps, [
    "class",
    "size",
  ]);

  return (
    <CheckboxPrimitive.ErrorMessage
      class={cn(
        checkboxErrorMessageVariants({ size: local.size ?? variants.size }),
        local.class,
      )}
      {...others}
    />
  );
};

type CheckboxVariant = NonNullable<CheckboxVariants["variant"]>;
type CheckboxSize = NonNullable<CheckboxVariants["size"]>;

export type { CheckboxRootProps, CheckboxSize, CheckboxVariant };
export {
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxErrorMessage,
  CheckboxIndicator,
  CheckboxInput,
  CheckboxLabel,
  checkboxControlVariants,
  checkboxDescriptionVariants,
  checkboxErrorMessageVariants,
  checkboxIndicatorVariants,
  checkboxLabelVariants,
  checkboxRootVariants,
};
