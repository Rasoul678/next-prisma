"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import React, { use } from "react";
import { FormContext } from "../GeneralForm";

type IProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
};

const InputField: React.FC<IProps> = ({
  name,
  label,
  placeholder,
  type = "text",
}) => {
  const form = use(FormContext);

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={form?.control}
      name={name || "name"}
      render={({ field: { value, ...restField } }) => (
        <FormItem>
          <FormLabel>{label || "label"}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : type}
                placeholder={placeholder || "placeholder"}
                defaultValue={value}
                {...restField}
              />
              {type === "password" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
