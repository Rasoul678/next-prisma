"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addUser(name: string, email: string) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({ include: { Post: true } });
    return users;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
