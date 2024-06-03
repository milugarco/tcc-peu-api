/*
  Warnings:

  - Added the required column `type` to the `users` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserGenrer" AS ENUM ('MALE', 'FEMALE', 'UNDEFINED');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'VISITANT');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "UserType" NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "UserGenrer" NOT NULL;
