-- DropForeignKey
ALTER TABLE "author_on_book" DROP CONSTRAINT "author_on_book_author_id_fkey";

-- DropForeignKey
ALTER TABLE "author_on_book" DROP CONSTRAINT "author_on_book_book_id_fkey";

-- AddForeignKey
ALTER TABLE "author_on_book" ADD CONSTRAINT "author_on_book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_on_book" ADD CONSTRAINT "author_on_book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
