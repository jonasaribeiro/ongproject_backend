/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `MovieAgeRating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieAgeRating_description_key" ON "MovieAgeRating"("description");
