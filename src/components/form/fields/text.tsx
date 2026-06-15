import { createSignal, Show } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  TextField,
  TextFieldDescription,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { useFieldContext } from "~/contexts/form";
import { cn } from "~/lib/utils";
import { masks } from "~/utils/masks";
import { FieldInfo } from "./info";

type TextInputType =
  | "text"
  | "email"
  | "url"
  | "password"
  | "number"
  | "search"
  | "tel";

type TextMask = keyof typeof masks | ((value: string) => string);

interface AppTextFieldProps {
  label: string;
  placeholder?: string;
  type?: TextInputType;
  mask?: TextMask;
  description?: string;
  onInput?: (value: string) => void;
  icon?: string;
}

export function AppTextField(props: AppTextFieldProps) {
  const field = useFieldContext<string>();
  const [showPassword, setShowPassword] = createSignal(false);

  const isPassword = () => props.type === "password";
  const isSearch = () => props.type === "search";
  const hasLeftIcon = () => isSearch() || Boolean(props.icon);

  const currentType = () =>
    isPassword() && showPassword() ? "text" : (props.type ?? "text");

  const isInvalid = () =>
    field().state.meta.isTouched && !field().state.meta.isValid;

  const applyMask = (value: string) => {
    if (!props.mask) return value;

    if (typeof props.mask === "function") {
      return props.mask(value);
    }

    return masks[props.mask](value);
  };

  const handleValueChange = (value: string) => {
    const nextValue = applyMask(value);

    field().handleChange(nextValue);
    props.onInput?.(nextValue);
  };

  return (
    <TextField
      name={field().name}
      value={field().state.value ?? ""}
      onChange={handleValueChange}
      onBlur={field().handleBlur}
      validationState={isInvalid() ? "invalid" : "valid"}
    >
      <TextFieldLabel>{props.label}</TextFieldLabel>

      <div class="relative">
        <Show when={hasLeftIcon()}>
          <div class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <span
              class={cn(isSearch() ? "i-lucide-search" : props.icon, "size-4")}
              aria-hidden="true"
            />
          </div>
        </Show>

        <TextFieldInput
          type={currentType()}
          placeholder={props.placeholder}
          class={cn(
            hasLeftIcon() && "pl-9",
            (isPassword() || isSearch()) && "pr-9",
          )}
        />

        <Show when={isPassword() || (isSearch() && field().state.value)}>
          <div class="absolute right-2 top-1/2 -translate-y-1/2">
            <Show
              when={isPassword()}
              fallback={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => field().handleChange("")}
                  aria-label="Limpar campo"
                >
                  <span class="i-lucide-x size-4" aria-hidden="true" />
                </Button>
              }
            >
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword() ? "Ocultar senha" : "Mostrar senha"}
              >
                <span
                  class={cn(
                    showPassword() ? "i-lucide-eye-off" : "i-lucide-eye",
                    "size-4",
                  )}
                  aria-hidden="true"
                />
              </Button>
            </Show>
          </div>
        </Show>
      </div>

      <Show when={props.description}>
        <TextFieldDescription>{props.description}</TextFieldDescription>
      </Show>

      <FieldInfo field={field()} />
    </TextField>
  );
}
