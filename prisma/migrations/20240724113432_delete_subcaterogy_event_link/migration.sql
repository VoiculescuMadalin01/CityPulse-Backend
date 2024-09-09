/*
  Warnings:

  - You are about to drop the column `eventUuid` on the `SubCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_eventUuid_fkey";

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "eventUuid";
