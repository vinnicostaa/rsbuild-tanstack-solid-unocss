import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as TextFieldPrimitive from "@kobalte/core/text-field";
import { cva } from "class-variance-authority";
import type { ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { cn } from "~/lib/utils";

type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

const textFieldRootVariants = cva("flex flex-col gap-1");

const textFieldInputVariants = cva(
  "flex h-11 w-full rounded-md border [border-color:var(--ui-comp-input-border)] [background-color:var(--ui-comp-input-bg)] px-3 py-2 text-sm [color:var(--ui-comp-input-fg)] ring-offset-background transition-colors placeholder:[color:var(--ui-comp-input-placeholder-fg)] disabled:cursor-not-allowed disabled:[border-color:var(--ui-comp-input-disabled-border)] disabled:[background-color:var(--ui-comp-input-disabled-bg)] disabled:[color:var(--ui-comp-input-disabled-fg)] data-[invalid]:[border-color:var(--ui-comp-input-invalid-border)] focus-visible:[border-color:var(--ui-comp-input-focus-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
);

const textFieldTextAreaVariants = cva(
  "min-h-24 w-full rounded-md border [border-color:var(--ui-comp-input-border)] [background-color:var(--ui-comp-input-bg)] px-3 py-2 text-sm [color:var(--ui-comp-input-fg)] ring-offset-background transition-colors placeholder:[color:var(--ui-comp-input-placeholder-fg)] disabled:cursor-not-allowed disabled:[border-color:var(--ui-comp-input-disabled-border)] disabled:[background-color:var(--ui-comp-input-disabled-bg)] disabled:[color:var(--ui-comp-input-disabled-fg)] data-[invalid]:[border-color:var(--ui-comp-input-invalid-border)] focus-visible:[border-color:var(--ui-comp-input-focus-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
);

const labelVariants = cva("text-sm font-medium leading-none", {
  variants: {
    variant: {
      label:
        "[color:var(--ui-comp-field-label-fg)] data-[invalid]:[color:var(--ui-comp-field-error-fg)] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
      description: "font-normal [color:var(--ui-comp-field-description-fg)]",
      error: "text-xs font-medium [color:var(--ui-comp-field-error-fg)]",
    },
  },
  defaultVariants: {
    variant: "label",
  },
});

type TextFieldRootProps<T extends ValidComponent = "div"> =
  TextFieldPrimitive.TextFieldRootProps<T> & {
    class?: string | undefined;
  };

const TextField = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldRootProps<T>>,
) => {
  const [local, others] = splitProps(props as TextFieldRootProps, ["class"]);

  return (
    <TextFieldPrimitive.Root
      class={cn(textFieldRootVariants(), local.class)}
      {...others}
    />
  );
};

type TextFieldInputProps<T extends ValidComponent = "input"> =
  TextFieldPrimitive.TextFieldInputProps<T> & {
    class?: string | undefined;
    type?: InputType;
  };

const TextFieldInput = <T extends ValidComponent = "input">(
  rawProps: PolymorphicProps<T, TextFieldInputProps<T>>,
) => {
  const props = mergeProps({ type: "text" as InputType }, rawProps);
  const [local, others] = splitProps(props as TextFieldInputProps, [
    "type",
    "class",
  ]);

  return (
    <TextFieldPrimitive.Input
      type={local.type}
      class={cn(textFieldInputVariants(), local.class)}
      {...others}
    />
  );
};

type TextFieldTextAreaProps<T extends ValidComponent = "textarea"> =
  TextFieldPrimitive.TextFieldTextAreaProps<T> & {
    class?: string | undefined;
  };

const TextFieldTextArea = <T extends ValidComponent = "textarea">(
  props: PolymorphicProps<T, TextFieldTextAreaProps<T>>,
) => {
  const [local, others] = splitProps(props as TextFieldTextAreaProps, [
    "class",
  ]);

  return (
    <TextFieldPrimitive.TextArea
      class={cn(textFieldTextAreaVariants(), local.class)}
      {...others}
    />
  );
};

type TextFieldLabelProps<T extends ValidComponent = "label"> =
  TextFieldPrimitive.TextFieldLabelProps<T> & {
    class?: string | undefined;
  };

const TextFieldLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, TextFieldLabelProps<T>>,
) => {
  const [local, others] = splitProps(props as TextFieldLabelProps, ["class"]);

  return (
    <TextFieldPrimitive.Label
      class={cn(labelVariants(), local.class)}
      {...others}
    />
  );
};

type TextFieldDescriptionProps<T extends ValidComponent = "div"> =
  TextFieldPrimitive.TextFieldDescriptionProps<T> & {
    class?: string | undefined;
  };

const TextFieldDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldDescriptionProps<T>>,
) => {
  const [local, others] = splitProps(props as TextFieldDescriptionProps, [
    "class",
  ]);

  return (
    <TextFieldPrimitive.Description
      class={cn(labelVariants({ variant: "description" }), local.class)}
      {...others}
    />
  );
};

type TextFieldErrorMessageProps<T extends ValidComponent = "div"> =
  TextFieldPrimitive.TextFieldErrorMessageProps<T> & {
    class?: string | undefined;
  };

const TextFieldErrorMessage = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldErrorMessageProps<T>>,
) => {
  const [local, others] = splitProps(props as TextFieldErrorMessageProps, [
    "class",
  ]);

  return (
    <TextFieldPrimitive.ErrorMessage
      class={cn(labelVariants({ variant: "error" }), local.class)}
      {...others}
    />
  );
};

export {
  TextField,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldTextArea,
};
