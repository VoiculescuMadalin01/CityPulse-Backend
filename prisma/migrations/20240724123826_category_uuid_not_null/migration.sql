/*
  Warnings:

  - Made the column `categoryUuid` on table `SubCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryUuid_fkey";

-- AlterTable
ALTER TABLE "SubCategory" ALTER COLUMN "categoryUuid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "Category"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
