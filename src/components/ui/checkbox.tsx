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
    "data-[checked]:[border-color:var(--ui-comp-checkbox-default-checked-border)]",
    "data-[checked]:[background-color:var(--ui-comp-checkbox-default-checked-bg)]",
    "data-[checked]:[color:var(--ui-comp-checkbox-default-checked-fg)]",
    "data-[indeterminate]:[border-color:var(--ui-comp-checkbox-default-checked-border)]",
    "data-[indeterminate]:[background-color:var(--ui-comp-checkbox-default-checked-bg)]",
    "data-[indeterminate]:[color:var(--ui-comp-checkbox-default-checked-fg)]",
  ].join(" "),
  secondary: [
    "data-[checked]:[border-color:var(--ui-comp-checkbox-secondary-checked-border)]",
    "data-[checked]:[background-color:var(--ui-comp-checkbox-secondary-checked-bg)]",
    "data-[checked]:[color:var(--ui-comp-checkbox-secondary-checked-fg)]",
    "data-[indeterminate]:[border-color:var(--ui-comp-checkbox-secondary-checked-border)]",
    "data-[indeterminate]:[background-color:var(--ui-comp-checkbox-secondary-checked-bg)]",
    "data-[indeterminate]:[color:var(--ui-comp-checkbox-secondary-checked-fg)]",
  ].join(" "),
  success: [
    "data-[checked]:[border-color:var(--ui-comp-checkbox-success-checked-border)]",
    "data-[checked]:[background-color:var(--ui-comp-checkbox-success-checked-bg)]",
    "data-[checked]:[color:var(--ui-comp-checkbox-success-checked-fg)]",
    "data-[indeterminate]:[border-color:var(--ui-comp-checkbox-success-checked-border)]",
    "data-[indeterminate]:[background-color:var(--ui-comp-checkbox-success-checked-bg)]",
    "data-[indeterminate]:[color:var(--ui-comp-checkbox-success-checked-fg)]",
  ].join(" "),
  warning: [
    "data-[checked]:[border-color:var(--ui-comp-checkbox-warning-checked-border)]",
    "data-[checked]:[background-color:var(--ui-comp-checkbox-warning-checked-bg)]",
    "data-[checked]:[color:var(--ui-comp-checkbox-warning-checked-fg)]",
    "data-[indeterminate]:[border-color:var(--ui-comp-checkbox-warning-checked-border)]",
    "data-[indeterminate]:[background-color:var(--ui-comp-checkbox-warning-checked-bg)]",
    "data-[indeterminate]:[color:var(--ui-comp-checkbox-warning-checked-fg)]",
  ].join(" "),
  info: [
    "data-[checked]:[border-color:var(--ui-comp-checkbox-info-checked-border)]",
    "data-[checked]:[background-color:var(--ui-comp-checkbox-info-checked-bg)]",
    "data-[checked]:[color:var(--ui-comp-checkbox-info-checked-fg)]",
    "data-[indeterminate]:[border-color:var(--ui-comp-checkbox-info-checked-border)]",
    "data-[indeterminate]:[background-color:var(--ui-comp-checkbox-info-checked-bg)]",
    "data-[indeterminate]:[color:var(--ui-comp-checkbox-info-checked-fg)]",
  ].join(" "),
  danger: [
    "data-[checked]:[border-color:var(--ui-comp-checkbox-danger-checked-border)]",
    "data-[checked]:[background-color:var(--ui-comp-checkbox-danger-checked-bg)]",
    "data-[checked]:[color:var(--ui-comp-checkbox-danger-checked-fg)]",
    "data-[indeterminate]:[border-color:var(--ui-comp-checkbox-danger-checked-border)]",
    "data-[indeterminate]:[background-color:var(--ui-comp-checkbox-danger-checked-bg)]",
    "data-[indeterminate]:[color:var(--ui-comp-checkbox-danger-checked-fg)]",
  ].join(" "),
};

const checkboxControlVariants = cva(
  "grid shrink-0 place-items-center border [border-color:var(--ui-comp-checkbox-border)] [background-color:var(--ui-comp-checkbox-bg)] text-transparent ring-offset-background transition-colors peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 data-[invalid]:[border-color:var(--ui-comp-checkbox-invalid-border)] data-[disabled]:cursor-not-allowed data-[disabled]:[opacity:var(--ui-comp-checkbox-disabled-opacity)]",
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
  "font-medium leading-none [color:var(--ui-comp-checkbox-label-fg)] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 data-[invalid]:[color:var(--ui-comp-checkbox-error-fg)]",
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
  "leading-relaxed [color:var(--ui-comp-checkbox-description-fg)]",
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

const checkboxErrorMessageVariants = cva(
  "font-medium [color:var(--ui-comp-checkbox-error-fg)]",
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
