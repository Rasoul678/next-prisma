"use client";

import InputField from "@/components/form/fields/Input";
import GeneralForm from "@/components/form/GeneralForm";
import { useActionWithNotify } from "@/hooks/useActionWithNotif";
import { signup } from "@/lib/actions/auth";
import { NotifType } from "@/lib/definitions";
import { SignupFormSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";
import { filedList } from "./fieldList";

type IProps = {};

const SignupForm: React.FC<IProps> = () => {
  const { state, action, pending, notify } = useActionWithNotify(
    signup,
    undefined
  );

  const [isPending, startTransition] = React.useTransition();

  if (!!state?.message && !isPending) {
    notify({
      message: "Signup Result!",
      type: state.code !== "200" ? NotifType.ERROR : NotifType.SUCCESS,
      data: {
        description: state.message,
        duration: 2000,
        id: "signup-notify",
      },
    });
  }

  if (state?.code === "200") {
    redirect("/");
  }

  const handleFormSubmit = (data: z.infer<typeof SignupFormSchema>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-[5rem]">Sign up</h1>
      <GeneralForm
        isPending={isPending || pending}
        formSchema={SignupFormSchema}
        onSubmit={handleFormSubmit}
        submitText="Register"
      >
        {filedList.map((field) => (
          <InputField key={field.name} {...field} />
        ))}
      </GeneralForm>
    </section>
  );
};

export default SignupForm;
