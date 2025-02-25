"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { FormState } from "../definitions";
import { SigninFormSchema, SignupFormSchema } from "../schemas";
import { createSession, deleteSession } from "../session";
import { prismaErrorMessageResolver } from "../utils";
const prisma = new PrismaClient();

export async function signup(state: FormState, formData: FormData) {
  //! Validation Form Data
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  //! Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    //! Insert into DB
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //! Create Session
    await createSession(String(user.id));

    //! Return Response
    return {
      message: "User created successfully",
      user: { name: user.name, email: user.email },
      code: "200",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const message = prismaErrorMessageResolver(error);
      return { message, code: error.code };
    }
    return { message: "Internal server error", code: "500" };
  } finally {
    await prisma.$disconnect();
  }
}

export async function signin(state: FormState, formData: FormData) {
  //! Validate Form Data
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    //! Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        message: "User not found",
        code: "404",
      };
    }

    //! Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        message: "Invalid password",
        code: "401",
      };
    }

    //! Create a session for the authenticated user
    await createSession(String(user.id));

    //! Return response
    return {
      message: "Sign-in successful",
      user: { name: user.name, email: user.email },
      code: "200",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const message = prismaErrorMessageResolver(error);
      return { message, code: error.code };
    }
    return { message: "Internal server error", code: "500" };
  } finally {
    await prisma.$disconnect();
  }
}

export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}
