/*
  Warnings:

  - The values [Season,Daram] on the enum `AnimeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `airDate` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `average` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `averageCount` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `bannerImage` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `popularity` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `trailerUrl` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `haremCount` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `trashPercent` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `airDate` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `AnimeCharacter` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('Watching', 'Completed', 'OnHold', 'Dropped', 'PlanToWatch');

-- AlterEnum
BEGIN;
CREATE TYPE "AnimeType_new" AS ENUM ('TV', 'Movie', 'OVA', 'ONA', 'Special', 'Drama');
ALTER TABLE "Anime" ALTER COLUMN "type" TYPE "AnimeType_new" USING ("type"::text::"AnimeType_new");
ALTER TYPE "AnimeType" RENAME TO "AnimeType_old";
ALTER TYPE "AnimeType_new" RENAME TO "AnimeType";
DROP TYPE "public"."AnimeType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AnimeCharacter" DROP CONSTRAINT "AnimeCharacter_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeCharacter" DROP CONSTRAINT "AnimeCharacter_characterId_fkey";

-- DropIndex
DROP INDEX "Anime_trendingScore_idx";

-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "airDate",
DROP COLUMN "average",
DROP COLUMN "averageCount",
DROP COLUMN "bannerImage",
DROP COLUMN "isFeatured",
DROP COLUMN "popularity",
DROP COLUMN "rating",
DROP COLUMN "trailerUrl",
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "popularityScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "releaseDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "description",
DROP COLUMN "haremCount",
DROP COLUMN "rating",
DROP COLUMN "ratingCount",
DROP COLUMN "trashPercent";

-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "airDate";

-- AlterTable
ALTER TABLE "Season" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "description";

-- DropTable
DROP TABLE "AnimeCharacter";

-- CreateTable
CREATE TABLE "UserAnime" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "status" "WatchStatus" NOT NULL DEFAULT 'PlanToWatch',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAnime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeCast" (
    "animeId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "AnimeCast_pkey" PRIMARY KEY ("animeId","characterId")
);

-- CreateIndex
CREATE INDEX "UserAnime_userId_idx" ON "UserAnime"("userId");

-- CreateIndex
CREATE INDEX "UserAnime_animeId_idx" ON "UserAnime"("animeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAnime_userId_animeId_key" ON "UserAnime"("userId", "animeId");

-- CreateIndex
CREATE INDEX "AnimeCast_characterId_idx" ON "AnimeCast"("characterId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "AnimeTag_tagId_idx" ON "AnimeTag"("tagId");

-- CreateIndex
CREATE INDEX "CharacterTag_tagId_idx" ON "CharacterTag"("tagId");

-- CreateIndex
CREATE INDEX "Episode_animeId_idx" ON "Episode"("animeId");

-- CreateIndex
CREATE INDEX "Episode_seasonId_idx" ON "Episode"("seasonId");

-- CreateIndex
CREATE INDEX "NewsAnime_animeId_idx" ON "NewsAnime"("animeId");

-- CreateIndex
CREATE INDEX "NewsPost_authorId_idx" ON "NewsPost"("authorId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_animeId_idx" ON "Review"("animeId");

-- CreateIndex
CREATE INDEX "Season_animeId_idx" ON "Season"("animeId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Subtitle_uploadedById_idx" ON "Subtitle"("uploadedById");

-- CreateIndex
CREATE INDEX "Tag_parentId_idx" ON "Tag"("parentId");

-- AddForeignKey
ALTER TABLE "UserAnime" ADD CONSTRAINT "UserAnime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnime" ADD CONSTRAINT "UserAnime_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeCast" ADD CONSTRAINT "AnimeCast_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeCast" ADD CONSTRAINT "AnimeCast_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
