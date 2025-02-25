"use client";

import InputField from "@/components/form/fields/Input";
import GeneralForm from "@/components/form/GeneralForm";
import { useActionWithNotify } from "@/hooks/useActionWithNotif";
import { signin } from "@/lib/actions/auth";
import { NotifType } from "@/lib/definitions";
import { SigninFormSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";
import { filedList } from "./fieldList";

type IProps = {};

const LoginForm: React.FC<IProps> = () => {
  const { state, action, pending, notify } = useActionWithNotify(
    signin,
    undefined
  );

  const [isPending, startTransition] = React.useTransition();

  if (!!state?.message && !isPending) {
    notify({
      message: "Signin Result!",
      type: state.code !== "200" ? NotifType.ERROR : NotifType.SUCCESS,
      data: {
        description: state.message,
        duration: 2000,
        id: "signin-notify",
      },
    });
  }

  if (state?.code === "200") {
    redirect("/");
  }

  const handleFormSubmit = (data: z.infer<typeof SigninFormSchema>) => {
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
      <h1 className="text-[5rem]">Sign In</h1>
      <GeneralForm
        isPending={isPending || pending}
        formSchema={SigninFormSchema}
        onSubmit={handleFormSubmit}
        submitText="Login"
      >
        {filedList.map((field) => (
          <InputField key={field.name} {...field} />
        ))}
      </GeneralForm>
    </section>
  );
};

export default LoginForm;
