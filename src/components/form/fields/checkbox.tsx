import { cva } from "class-variance-authority";
import { Show } from "solid-js";
import {
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxErrorMessage,
  CheckboxIndicator,
  CheckboxInput,
  CheckboxLabel,
  type CheckboxSize,
  type CheckboxVariant,
} from "~/components/ui/checkbox";
import { useFieldContext } from "~/contexts/form";
import { cn } from "~/lib/utils";
import { getErrorMessages } from "./info";

const checkboxFieldVariants = cva(
  "rounded-lg border [border-color:var(--ui-comp-form-field-border)] [background-color:var(--ui-comp-form-field-bg)] [color:var(--ui-comp-form-field-fg)] data-[invalid]:[border-color:var(--ui-comp-form-field-invalid-border)]",
  {
    variants: {
      size: {
        sm: "p-2",
        default: "p-3 sm:p-4",
        lg: "p-4 sm:p-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface AppCheckboxFieldProps {
  label: string;
  description?: string;
  class?: string;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  disabled?: boolean;
  required?: boolean;
}

export function AppCheckboxField(props: AppCheckboxFieldProps) {
  const field = useFieldContext<boolean>();

  const isInvalid = () =>
    field().state.meta.isTouched && !field().state.meta.isValid;

  const errors = () => getErrorMessages(field().state.meta.errors);

  return (
    <Checkbox
      name={field().name}
      checked={field().state.value ?? false}
      onChange={(checked) => field().handleChange(checked)}
      onBlur={field().handleBlur}
      validationState={isInvalid() ? "invalid" : "valid"}
      variant={props.variant}
      size={props.size}
      disabled={props.disabled}
      required={props.required}
      class={cn(checkboxFieldVariants({ size: props.size }), props.class)}
    >
      {(state) => (
        <>
          <CheckboxInput />
          <CheckboxControl class="mt-0.5">
            <CheckboxIndicator>
              <span
                class={cn(
                  state.indeterminate() ? "i-lucide-minus" : "i-lucide-check",
                  "size-full",
                )}
                aria-hidden="true"
              />
            </CheckboxIndicator>
          </CheckboxControl>

          <div class="min-w-0 flex-1 space-y-1">
            <CheckboxLabel>{props.label}</CheckboxLabel>

            <Show when={props.description}>
              <CheckboxDescription>{props.description}</CheckboxDescription>
            </Show>

            <Show when={isInvalid() && errors()}>
              <CheckboxErrorMessage>{errors()}</CheckboxErrorMessage>
            </Show>

            <Show when={field().state.meta.isValidating}>
              <span class="flex items-center gap-1 [color:var(--ui-comp-form-field-validating-fg)] text-xs">
                <span
                  class="i-lucide-loader-2 size-3 animate-spin"
                  aria-hidden="true"
                />
                Verificando...
              </span>
            </Show>
          </div>
        </>
      )}
    </Checkbox>
  );
}
