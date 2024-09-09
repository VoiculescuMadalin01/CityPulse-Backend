/*
  Warnings:

  - You are about to drop the column `images` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `isFree` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `isVisible` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `organizerName` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `geolocation` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `location_type` on the `Location` table. All the data in the column will be lost.
  - Added the required column `isEnable` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizer_uuid` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_user_uuid_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "images",
DROP COLUMN "isFree",
DROP COLUMN "isVisible",
DROP COLUMN "organizerName",
DROP COLUMN "publishedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "eventImages" TEXT[],
ADD COLUMN     "isEnable" BOOLEAN NOT NULL,
ADD COLUMN     "organizer_uuid" TEXT NOT NULL,
ADD COLUMN     "presentationImage" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "geolocation",
DROP COLUMN "image",
DROP COLUMN "location_type",
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "locationImages" TEXT[],
ADD COLUMN     "longitude" TEXT NOT NULL,
ADD COLUMN     "presentationImage" TEXT;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizer_uuid_fkey" FOREIGN KEY ("organizer_uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
