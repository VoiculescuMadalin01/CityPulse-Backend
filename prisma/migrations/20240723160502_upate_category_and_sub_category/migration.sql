/*
  Warnings:

  - You are about to drop the column `type` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToEvent" DROP CONSTRAINT "_CategoryToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToEvent" DROP CONSTRAINT "_CategoryToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToTag" DROP CONSTRAINT "_EventToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToTag" DROP CONSTRAINT "_EventToTag_B_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "type",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "eventUuid" TEXT,
ADD COLUMN     "isEnable" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_CategoryToEvent";

-- DropTable
DROP TABLE "_EventToTag";

-- CreateTable
CREATE TABLE "SubCategory" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isEnable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CategoryOnSubCategory" (
    "categoryUuid" TEXT NOT NULL,
    "subCategoryUuid" TEXT NOT NULL,
    "facilityUuid" TEXT,

    CONSTRAINT "CategoryOnSubCategory_pkey" PRIMARY KEY ("categoryUuid","subCategoryUuid")
);

-- CreateTable
CREATE TABLE "_EventToSubCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_uuid_key" ON "SubCategory"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_key" ON "SubCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSubCategory_AB_unique" ON "_EventToSubCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSubCategory_B_index" ON "_EventToSubCategory"("B");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_eventUuid_fkey" FOREIGN KEY ("eventUuid") REFERENCES "Event"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnSubCategory" ADD CONSTRAINT "CategoryOnSubCategory_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "Category"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnSubCategory" ADD CONSTRAINT "CategoryOnSubCategory_subCategoryUuid_fkey" FOREIGN KEY ("subCategoryUuid") REFERENCES "SubCategory"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSubCategory" ADD CONSTRAINT "_EventToSubCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSubCategory" ADD CONSTRAINT "_EventToSubCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategory"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
