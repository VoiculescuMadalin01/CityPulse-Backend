/*
  Warnings:

  - The primary key for the `Facility` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[uuid]` on the table `Facility` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_EventToFacility" DROP CONSTRAINT "_EventToFacility_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToTag" DROP CONSTRAINT "_EventToTag_B_fkey";

-- AlterTable
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_pkey",
ALTER COLUMN "uuid" DROP DEFAULT,
ALTER COLUMN "uuid" SET DATA TYPE TEXT,
ADD CONSTRAINT "Facility_pkey" PRIMARY KEY ("uuid");
DROP SEQUENCE "Facility_uuid_seq";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ALTER COLUMN "uuid" DROP DEFAULT,
ALTER COLUMN "uuid" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("uuid");
DROP SEQUENCE "Tag_uuid_seq";

-- AlterTable
ALTER TABLE "_EventToFacility" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_EventToTag" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Facility_uuid_key" ON "Facility"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_uuid_key" ON "Tag"("uuid");

-- AddForeignKey
ALTER TABLE "_EventToTag" ADD CONSTRAINT "_EventToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToFacility" ADD CONSTRAINT "_EventToFacility_B_fkey" FOREIGN KEY ("B") REFERENCES "Facility"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
