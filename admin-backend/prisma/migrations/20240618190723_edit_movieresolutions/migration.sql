/*
  Warnings:

  - You are about to drop the column `movieId` on the `MovieResolution` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `MovieResolution` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MovieResolution" DROP CONSTRAINT "MovieResolution_movieId_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "audioPath" TEXT;

-- AlterTable
ALTER TABLE "MovieResolution" DROP COLUMN "movieId";

-- CreateTable
CREATE TABLE "_MovieResolutions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieResolutions_AB_unique" ON "_MovieResolutions"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieResolutions_B_index" ON "_MovieResolutions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "MovieResolution_name_key" ON "MovieResolution"("name");

-- AddForeignKey
ALTER TABLE "_MovieResolutions" ADD CONSTRAINT "_MovieResolutions_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieResolutions" ADD CONSTRAINT "_MovieResolutions_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieResolution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
