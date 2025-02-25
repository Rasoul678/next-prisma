import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ArgsType = {
  formSchema: z.ZodSchema;
  defaultValues: Record<string, string | number | (string | number)[]>;
};
export const useGeneralForm = ({ formSchema, defaultValues }: ArgsType) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return form;
};
