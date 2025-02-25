"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGeneralForm } from "@/hooks/useGeneralForm";
import React from "react";
import { UseFormReturn } from "react-hook-form";

export const FormContext = React.createContext<UseFormReturn | null>(null);

type IProps<T extends z.ZodSchema> = {
  onSubmit?: (data: z.infer<T>) => void;
  formSchema: T;
  defaultValues?: Record<string, string>;
  children: React.ReactNode;
  submitText?: string;
  isPending: boolean;
};

const GeneralForm = <T extends z.ZodSchema>(props: IProps<T>) => {
  const {
    onSubmit,
    formSchema,
    defaultValues = {},
    submitText,
    isPending,
    children,
  } = props;

  const form = useGeneralForm({ formSchema, defaultValues });

  const handleSubmit = (data: z.infer<T>) => {
    onSubmit?.(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-2/5 space-y-3"
      >
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
        <Button className="uppercase" disabled={isPending}>
          {submitText || "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default GeneralForm;
