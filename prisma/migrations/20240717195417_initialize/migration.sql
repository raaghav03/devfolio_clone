/*
  Warnings:

  - The primary key for the `Name` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Name` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[username]` on the table `Name` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Name` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Name` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Name" DROP CONSTRAINT "Name_pkey",
ADD COLUMN     "email" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ADD CONSTRAINT "Name_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Name_username_key" ON "Name"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Name_email_key" ON "Name"("email");
