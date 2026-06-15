import { createFormHook } from "@tanstack/solid-form";
import { AppCheckboxField } from "~/components/form/fields/checkbox";
import { SubmitButton } from "~/components/form/submit-button";
import { AppTextField } from "~/components/form/fields/text";
import { fieldContext, formContext } from "../contexts/form";

const formHook = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField: AppTextField,
    CheckboxField: AppCheckboxField,
  },
  formComponents: {
    SubmitButton,
  },
});

export const { useAppForm, withForm, withFieldGroup } = formHook;

export type AppFormType = ReturnType<typeof useAppForm>;
