-- CreateEnum
CREATE TYPE "GenreType" AS ENUM ('FANTASY', 'SCIENCE_FICTION', 'ACTION_ADVENTURE', 'MYSTERY', 'HORROR', 'THRILLER_SUSPENSE', 'HISTORICAL_FICTION', 'ROMANCE', 'SHORT_STORY', 'CHILDRENS', 'AUTOBIOGRAPHY', 'FOOD_DRINK', 'ART', 'SELF_HELP', 'HISTORY', 'TRAVEL', 'CRIME');

-- CreateTable
CREATE TABLE "authors" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "public_id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "genre" "GenreType" NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "isbn" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author_on_book" (
    "book_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "author_on_book_pkey" PRIMARY KEY ("book_id","author_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authors_public_id_key" ON "authors"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "books_public_id_key" ON "books"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");

-- AddForeignKey
ALTER TABLE "author_on_book" ADD CONSTRAINT "author_on_book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_on_book" ADD CONSTRAINT "author_on_book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
