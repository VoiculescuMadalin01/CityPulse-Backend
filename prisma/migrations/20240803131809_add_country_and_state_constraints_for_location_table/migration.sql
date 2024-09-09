-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "countryId" TEXT,
ADD COLUMN     "stateId" TEXT;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "States"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
