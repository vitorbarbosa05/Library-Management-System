/*
  Warnings:

  - You are about to alter the column `bio` on the `authors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- DropForeignKey
ALTER TABLE "author_on_book" DROP CONSTRAINT "author_on_book_author_id_fkey";

-- DropForeignKey
ALTER TABLE "author_on_book" DROP CONSTRAINT "author_on_book_book_id_fkey";

-- AlterTable
ALTER TABLE "authors" ALTER COLUMN "bio" SET DATA TYPE VARCHAR(200);

-- AddForeignKey
ALTER TABLE "author_on_book" ADD CONSTRAINT "author_on_book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_on_book" ADD CONSTRAINT "author_on_book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
