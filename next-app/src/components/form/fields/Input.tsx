"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { use } from "react";
import { FormContext } from "../GeneralForm";

type IProps = {
  name?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
};

const InputField: React.FC<IProps> = ({
  name,
  label,
  description,
  placeholder,
  type = "text",
}) => {
  const form = use(FormContext);

  return (
    <FormField
      control={form?.control}
      name={name || "form"}
      render={({ field: { value, ...restField } }) => (
        <FormItem>
          <FormLabel>{label || "form label"}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || "placeholder"}
              defaultValue={value}
              {...restField}
            />
          </FormControl>
          <FormDescription>{description || "form description"}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
