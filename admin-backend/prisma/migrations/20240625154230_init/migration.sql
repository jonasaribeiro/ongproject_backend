-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pubYear" TEXT NOT NULL,
    "ageRatingId" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieResolution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MovieResolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieAgeRating" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MovieAgeRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieResolutions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieResolution_name_key" ON "MovieResolution"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieResolutions_AB_unique" ON "_MovieResolutions"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieResolutions_B_index" ON "_MovieResolutions"("B");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_ageRatingId_fkey" FOREIGN KEY ("ageRatingId") REFERENCES "MovieAgeRating"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieResolutions" ADD CONSTRAINT "_MovieResolutions_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieResolutions" ADD CONSTRAINT "_MovieResolutions_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieResolution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
