/*
  Warnings:

  - You are about to drop the column `online` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "online",
ADD COLUMN     "lastOnline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
