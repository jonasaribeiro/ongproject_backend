/*
  Warnings:

  - You are about to alter the column `name` on the `AgeRating` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `Episode` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `Episode` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `ageRatingId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `pubYear` on the `Movie` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `ageRatingId` on the `Serie` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `Serie` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Serie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `Serie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `MovieResolution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieResolutions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SerieCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `release` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release` to the `Serie` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Membership" AS ENUM ('plus', 'standard', 'test');

-- CreateEnum
CREATE TYPE "PayMethod" AS ENUM ('credit', 'debit');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('movie', 'serie');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_ageRatingId_fkey";

-- DropForeignKey
ALTER TABLE "Serie" DROP CONSTRAINT "Serie_ageRatingId_fkey";

-- DropForeignKey
ALTER TABLE "_MovieCategories" DROP CONSTRAINT "_MovieCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieCategories" DROP CONSTRAINT "_MovieCategories_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieResolutions" DROP CONSTRAINT "_MovieResolutions_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieResolutions" DROP CONSTRAINT "_MovieResolutions_B_fkey";

-- DropForeignKey
ALTER TABLE "_SerieCategories" DROP CONSTRAINT "_SerieCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_SerieCategories" DROP CONSTRAINT "_SerieCategories_B_fkey";

-- AlterTable
ALTER TABLE "AgeRating" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "ageRatingId",
DROP COLUMN "pubYear",
ADD COLUMN     "release" VARCHAR(4) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "release" VARCHAR(4) NOT NULL,
ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Serie" DROP COLUMN "ageRatingId",
DROP COLUMN "releaseYear",
ADD COLUMN     "release" VARCHAR(4) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "MovieResolution";

-- DropTable
DROP TABLE "_MovieCategories";

-- DropTable
DROP TABLE "_MovieResolutions";

-- DropTable
DROP TABLE "_SerieCategories";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "asaasId" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "resetPassword" VARCHAR(255) NOT NULL DEFAULT '',
    "registration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "membership" "Membership" NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,
    "avatarId" TEXT NOT NULL,
    "age" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "number" VARCHAR(16) NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,
    "cvv" VARCHAR(3) NOT NULL,
    "ownerName" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "method" "PayMethod" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "source" VARCHAR(255) NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restrictions" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "movieId" TEXT,
    "serieId" TEXT,

    CONSTRAINT "Restrictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MyList" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "movieId" TEXT,
    "serieId" TEXT,

    CONSTRAINT "MyList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resolution" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Resolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResolutionSerie" (
    "serieId" TEXT NOT NULL,
    "resolutionId" TEXT NOT NULL,

    CONSTRAINT "ResolutionSerie_pkey" PRIMARY KEY ("serieId","resolutionId")
);

-- CreateTable
CREATE TABLE "ResolutionMovie" (
    "movieId" TEXT NOT NULL,
    "resolutionId" TEXT NOT NULL,

    CONSTRAINT "ResolutionMovie_pkey" PRIMARY KEY ("movieId","resolutionId")
);

-- CreateTable
CREATE TABLE "WatchingSerie" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "serieId" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "WatchingSerie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchingMovie" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "movieId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "WatchingMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieCategory" (
    "movieId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "MovieCategory_pkey" PRIMARY KEY ("movieId","categoryId")
);

-- CreateTable
CREATE TABLE "SerieCategory" (
    "serieId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "SerieCategory_pkey" PRIMARY KEY ("serieId","categoryId")
);

-- CreateTable
CREATE TABLE "MovieAgeRating" (
    "movieId" TEXT NOT NULL,
    "ageRatingId" TEXT NOT NULL,

    CONSTRAINT "MovieAgeRating_pkey" PRIMARY KEY ("movieId","ageRatingId")
);

-- CreateTable
CREATE TABLE "SerieAgeRating" (
    "serieId" TEXT NOT NULL,
    "ageRatingId" TEXT NOT NULL,

    CONSTRAINT "SerieAgeRating_pkey" PRIMARY KEY ("serieId","ageRatingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Resolution_name_key" ON "Resolution"("name");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_age_fkey" FOREIGN KEY ("age") REFERENCES "AgeRating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restrictions" ADD CONSTRAINT "Restrictions_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restrictions" ADD CONSTRAINT "Restrictions_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restrictions" ADD CONSTRAINT "Restrictions_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyList" ADD CONSTRAINT "MyList_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyList" ADD CONSTRAINT "MyList_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyList" ADD CONSTRAINT "MyList_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResolutionSerie" ADD CONSTRAINT "ResolutionSerie_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResolutionSerie" ADD CONSTRAINT "ResolutionSerie_resolutionId_fkey" FOREIGN KEY ("resolutionId") REFERENCES "Resolution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResolutionMovie" ADD CONSTRAINT "ResolutionMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResolutionMovie" ADD CONSTRAINT "ResolutionMovie_resolutionId_fkey" FOREIGN KEY ("resolutionId") REFERENCES "Resolution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchingSerie" ADD CONSTRAINT "WatchingSerie_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchingSerie" ADD CONSTRAINT "WatchingSerie_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchingSerie" ADD CONSTRAINT "WatchingSerie_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchingMovie" ADD CONSTRAINT "WatchingMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchingMovie" ADD CONSTRAINT "WatchingMovie_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCategory" ADD CONSTRAINT "MovieCategory_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCategory" ADD CONSTRAINT "MovieCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerieCategory" ADD CONSTRAINT "SerieCategory_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerieCategory" ADD CONSTRAINT "SerieCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieAgeRating" ADD CONSTRAINT "MovieAgeRating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieAgeRating" ADD CONSTRAINT "MovieAgeRating_ageRatingId_fkey" FOREIGN KEY ("ageRatingId") REFERENCES "AgeRating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerieAgeRating" ADD CONSTRAINT "SerieAgeRating_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerieAgeRating" ADD CONSTRAINT "SerieAgeRating_ageRatingId_fkey" FOREIGN KEY ("ageRatingId") REFERENCES "AgeRating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
