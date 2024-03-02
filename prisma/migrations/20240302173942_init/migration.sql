/*
  Warnings:

  - You are about to drop the column `public` on the `Pledge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pledge" DROP COLUMN "public",
ADD COLUMN     "canPublic" BOOLEAN NOT NULL DEFAULT false;
