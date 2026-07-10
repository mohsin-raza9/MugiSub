/*
  Warnings:

  - The values [Hiatus] on the enum `AnimeStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [TV,OVA,ONA,Web,Special] on the enum `AnimeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ageRating` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `nextEpisodeAt` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `titleEnglish` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `titleJapanese` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `titleRomaji` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `lengthMinutes` on the `Episode` table. All the data in the column will be lost.
  - Added the required column `title` to the `Anime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AnimeStatus_new" AS ENUM ('Airing', 'Finished', 'Upcoming');
ALTER TABLE "Anime" ALTER COLUMN "status" TYPE "AnimeStatus_new" USING ("status"::text::"AnimeStatus_new");
ALTER TYPE "AnimeStatus" RENAME TO "AnimeStatus_old";
ALTER TYPE "AnimeStatus_new" RENAME TO "AnimeStatus";
DROP TYPE "public"."AnimeStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "AnimeType_new" AS ENUM ('Movie', 'Season', 'Daram');
ALTER TABLE "Anime" ALTER COLUMN "type" TYPE "AnimeType_new" USING ("type"::text::"AnimeType_new");
ALTER TYPE "AnimeType" RENAME TO "AnimeType_old";
ALTER TYPE "AnimeType_new" RENAME TO "AnimeType";
DROP TYPE "public"."AnimeType_old";
COMMIT;

-- DropIndex
DROP INDEX "Subtitle_episodeId_language_format_key";

-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "ageRating",
DROP COLUMN "endDate",
DROP COLUMN "nextEpisodeAt",
DROP COLUMN "titleEnglish",
DROP COLUMN "titleJapanese",
DROP COLUMN "titleRomaji",
DROP COLUMN "videoUrl",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "lengthMinutes";

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Subtitle" ADD COLUMN     "animeId" TEXT,
ALTER COLUMN "episodeId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Subtitle_animeId_idx" ON "Subtitle"("animeId");

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
