"use client";

import InputField from "@/components/form/fields/Input";
import GeneralForm from "@/components/form/GeneralForm";
import { TabsContent } from "@/components/ui/tabs";
import { signin } from "@/lib/actions/auth";
import { SigninFormSchema } from "@/lib/schemas";
import React from "react";
import { z } from "zod";
import { filedList } from "./fieldList";

type IProps = {};

const LoginForm: React.FC<IProps> = () => {
  const [isPending, startTransition] = React.useTransition();

  const handleFormSubmit = (data: z.infer<typeof SigninFormSchema>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    startTransition(() => {
      signin(formData);
    });
  };

  return (
    <TabsContent value="login">
      <h1 className="text-[2rem] md:text-[3.5rem] text-center">Log In</h1>
      <GeneralForm
        isPending={isPending}
        formSchema={SigninFormSchema}
        onSubmit={handleFormSubmit}
        submitText="Login"
      >
        {filedList.map((field) => (
          <InputField key={field.name} {...field} />
        ))}
      </GeneralForm>
    </TabsContent>
  );
};

export default LoginForm;
