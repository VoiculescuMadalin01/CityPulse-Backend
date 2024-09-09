/*
  Warnings:

  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `City` table. All the data in the column will be lost.
  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Country` table. All the data in the column will be lost.
  - The primary key for the `Facility` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Facility` table. All the data in the column will be lost.
  - The primary key for the `States` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `States` table. All the data in the column will be lost.
  - The primary key for the `SupportTicket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ticket_uuid` on the `SupportTicket` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `SupportTicket` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `SupportTicket` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_stateId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_cityId_fkey";

-- DropForeignKey
ALTER TABLE "States" DROP CONSTRAINT "States_countryId_fkey";

-- DropForeignKey
ALTER TABLE "_EventToFacility" DROP CONSTRAINT "_EventToFacility_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToTag" DROP CONSTRAINT "_EventToTag_B_fkey";

-- DropIndex
DROP INDEX "SupportTicket_ticket_uuid_key";

-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" SERIAL NOT NULL,
ADD CONSTRAINT "City_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" SERIAL NOT NULL,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" SERIAL NOT NULL,
ADD CONSTRAINT "Facility_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "States" DROP CONSTRAINT "States_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" SERIAL NOT NULL,
ADD CONSTRAINT "States_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "SupportTicket" DROP CONSTRAINT "SupportTicket_pkey",
DROP COLUMN "ticket_uuid",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" SERIAL NOT NULL,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SupportTicket_uuid_key" ON "SupportTicket"("uuid");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "States"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "States" ADD CONSTRAINT "States_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTag" ADD CONSTRAINT "_EventToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToFacility" ADD CONSTRAINT "_EventToFacility_B_fkey" FOREIGN KEY ("B") REFERENCES "Facility"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
