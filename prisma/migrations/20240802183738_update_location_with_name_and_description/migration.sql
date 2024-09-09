/*
  Warnings:

  - Added the required column `description` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "cityId" DROP NOT NULL;
