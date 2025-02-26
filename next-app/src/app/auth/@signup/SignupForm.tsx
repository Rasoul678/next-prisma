"use client";

import InputField from "@/components/form/fields/Input";
import GeneralForm from "@/components/form/GeneralForm";
import { TabsContent } from "@/components/ui/tabs";
import { signup } from "@/lib/actions/auth";
import { SignupFormSchema } from "@/lib/schemas";
import React from "react";
import { z } from "zod";
import { filedList } from "./fieldList";

type IProps = {};

const SignupForm: React.FC<IProps> = () => {
  const [isPending, startTransition] = React.useTransition();

  const handleFormSubmit = (data: z.infer<typeof SignupFormSchema>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    startTransition(() => {
      signup(formData);
    });
  };

  return (
    <TabsContent value="signup">
      <h1 className="text-[2rem] md:text-[3.5rem] text-center">Sign up</h1>
      <GeneralForm
        isPending={isPending}
        formSchema={SignupFormSchema}
        onSubmit={handleFormSubmit}
        submitText="Register"
      >
        {filedList.map((field) => (
          <InputField key={field.name} {...field} />
        ))}
      </GeneralForm>
    </TabsContent>
  );
};

export default SignupForm;
