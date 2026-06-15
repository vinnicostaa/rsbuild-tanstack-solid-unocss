import type { JSX } from "solid-js";
import { Button, type ButtonProps } from "~/components/ui/button";
import { useFormContext } from "~/contexts/form";

interface SubmitButtonProps extends Omit<ButtonProps, "type"> {
  label?: string;
  loadingLabel?: string;
  children?: JSX.Element;
}

export function SubmitButton(props: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        canSubmit: state.canSubmit,
      })}
    >
      {(state) => (
        <Button
          class="px-3 !py-2"
          {...props}
          type="submit"
          disabled={
            state().isSubmitting || !state().canSubmit || props.disabled
          }
          loading={state().isSubmitting}
          loadingText={props.loadingLabel ?? "Salvando..."}
        >
          {props.label ?? props.children ?? "Salvar"}
        </Button>
      )}
    </form.Subscribe>
  );
}
