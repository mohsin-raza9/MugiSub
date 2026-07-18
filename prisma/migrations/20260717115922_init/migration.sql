/*
  Warnings:

  - You are about to drop the `UserAnime` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `airingDate` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Episode` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserAnime" DROP CONSTRAINT "UserAnime_animeId_fkey";

-- DropForeignKey
ALTER TABLE "UserAnime" DROP CONSTRAINT "UserAnime_userId_fkey";

-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "airingDate" TEXT NOT NULL,
ALTER COLUMN "title" SET NOT NULL;

-- DropTable
DROP TABLE "UserAnime";

-- DropEnum
DROP TYPE "WatchStatus";
