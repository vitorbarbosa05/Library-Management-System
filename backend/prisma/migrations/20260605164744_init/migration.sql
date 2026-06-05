/*
  Warnings:

  - You are about to drop the column `member` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "member",
ADD COLUMN     "memberShipStatus" "MemberShipStatus" NOT NULL DEFAULT 'ACTIVE';
