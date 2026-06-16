import { splitProps, type JSX } from "solid-js";
import { Button, type ButtonProps } from "~/components/ui/button";
import { useFormContext } from "~/contexts/form";
import { cn } from "~/lib/utils";

interface SubmitButtonProps extends Omit<ButtonProps, "type"> {
  label?: string;
  loadingLabel?: string;
  children?: JSX.Element;
}

export function SubmitButton(props: SubmitButtonProps) {
  const form = useFormContext();
  const [local, buttonProps] = splitProps(props, [
    "label",
    "loadingLabel",
    "children",
    "class",
    "disabled",
  ]);

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        canSubmit: state.canSubmit,
      })}
    >
      {(state) => (
        <Button
          {...buttonProps}
          class={cn("px-3 !py-2", local.class)}
          type="submit"
          disabled={
            state().isSubmitting || !state().canSubmit || local.disabled
          }
          loading={state().isSubmitting}
          loadingText={local.loadingLabel ?? "Salvando..."}
        >
          {local.label ?? local.children ?? "Salvar"}
        </Button>
      )}
    </form.Subscribe>
  );
}
