-- CreateTable
CREATE TABLE "MovieGenre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieGenres" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieGenre_name_key" ON "MovieGenre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieGenres_AB_unique" ON "_MovieGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieGenres_B_index" ON "_MovieGenres"("B");

-- AddForeignKey
ALTER TABLE "_MovieGenres" ADD CONSTRAINT "_MovieGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieGenres" ADD CONSTRAINT "_MovieGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
