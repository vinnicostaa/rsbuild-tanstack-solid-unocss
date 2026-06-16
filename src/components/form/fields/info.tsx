import type { AnyFieldApi } from "@tanstack/solid-form";
import { Show } from "solid-js";
import { TextFieldErrorMessage } from "~/components/ui/text-field";

interface FieldInfoProps {
  field: AnyFieldApi;
}

function getIssueMessage(error: object) {
  if (!("issues" in error)) return null;

  const issues = (error as { issues?: unknown }).issues;

  if (!Array.isArray(issues)) return null;

  const firstIssue = issues[0];

  if (firstIssue && typeof firstIssue === "object" && "message" in firstIssue) {
    return String(firstIssue.message);
  }

  return null;
}

export function getErrorMessages(errors: unknown[]): string {
  if (!Array.isArray(errors) || errors.length === 0) return "";

  return errors
    .map((error) => {
      if (typeof error === "string") return error;

      if (error instanceof Error) return error.message;

      if (error && typeof error === "object") {
        const issueMessage = getIssueMessage(error);
        if (issueMessage) return issueMessage;

        if ("message" in error) {
          return String(error.message);
        }
      }

      return "Valor inválido";
    })
    .filter(Boolean)
    .join(", ");
}

export function FieldInfo(props: FieldInfoProps) {
  const showErrors = () =>
    props.field.state.meta.isTouched && !props.field.state.meta.isValid;

  const errors = () => getErrorMessages(props.field.state.meta.errors);

  return (
    <>
      <Show when={showErrors() && errors()}>
        <TextFieldErrorMessage>{errors()}</TextFieldErrorMessage>
      </Show>

      <Show when={props.field.state.meta.isValidating}>
        <span class="mt-1 flex items-center gap-1 [color:var(--ui-comp-form-field-validating-fg)] text-xs">
          <span
            class="i-lucide-loader-2 size-3 animate-spin"
            aria-hidden="true"
          />
          Verificando...
        </span>
      </Show>
    </>
  );
}
