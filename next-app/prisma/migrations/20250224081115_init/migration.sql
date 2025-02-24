/*
  Warnings:

  - You are about to drop the `me` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "me";

-- CreateTable
CREATE TABLE "Me" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "Me_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Me_email_key" ON "Me"("email");
