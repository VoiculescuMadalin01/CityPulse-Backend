/*
  Warnings:

  - You are about to drop the `CategoryOnSubCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToSubCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryOnSubCategory" DROP CONSTRAINT "CategoryOnSubCategory_categoryUuid_fkey";

-- DropForeignKey
ALTER TABLE "CategoryOnSubCategory" DROP CONSTRAINT "CategoryOnSubCategory_subCategoryUuid_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSubCategory" DROP CONSTRAINT "_EventToSubCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSubCategory" DROP CONSTRAINT "_EventToSubCategory_B_fkey";

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "categoryUuid" TEXT,
ADD COLUMN     "eventUuid" TEXT;

-- DropTable
DROP TABLE "CategoryOnSubCategory";

-- DropTable
DROP TABLE "_EventToSubCategory";

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "Category"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_eventUuid_fkey" FOREIGN KEY ("eventUuid") REFERENCES "Event"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
