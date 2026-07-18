/*
  Warnings:

  - You are about to drop the column `vaId` on the `AnimeCharacter` table. All the data in the column will be lost.
  - You are about to drop the `AnimeCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeStudio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Creator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CuratedList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CuratedListItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EditRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ForumCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ForumPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ForumThread` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MyListEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaylistItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Studio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WatchHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserFavoriteTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnimeCharacter" DROP CONSTRAINT "AnimeCharacter_vaId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeCollection" DROP CONSTRAINT "AnimeCollection_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeCollection" DROP CONSTRAINT "AnimeCollection_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeStudio" DROP CONSTRAINT "AnimeStudio_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeStudio" DROP CONSTRAINT "AnimeStudio_studioId_fkey";

-- DropForeignKey
ALTER TABLE "CuratedListItem" DROP CONSTRAINT "CuratedListItem_animeId_fkey";

-- DropForeignKey
ALTER TABLE "CuratedListItem" DROP CONSTRAINT "CuratedListItem_curatedListId_fkey";

-- DropForeignKey
ALTER TABLE "EditRequest" DROP CONSTRAINT "EditRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_animeId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_characterId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "ForumPost" DROP CONSTRAINT "ForumPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ForumPost" DROP CONSTRAINT "ForumPost_parentId_fkey";

-- DropForeignKey
ALTER TABLE "ForumPost" DROP CONSTRAINT "ForumPost_threadId_fkey";

-- DropForeignKey
ALTER TABLE "ForumThread" DROP CONSTRAINT "ForumThread_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ForumThread" DROP CONSTRAINT "ForumThread_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "MyListEntry" DROP CONSTRAINT "MyListEntry_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "MyListEntry" DROP CONSTRAINT "MyListEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistItem" DROP CONSTRAINT "PlaylistItem_animeId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistItem" DROP CONSTRAINT "PlaylistItem_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "WatchHistory" DROP CONSTRAINT "WatchHistory_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "WatchHistory" DROP CONSTRAINT "WatchHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoriteTags" DROP CONSTRAINT "_UserFavoriteTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoriteTags" DROP CONSTRAINT "_UserFavoriteTags_B_fkey";

-- AlterTable
ALTER TABLE "AnimeCharacter" DROP COLUMN "vaId";

-- DropTable
DROP TABLE "AnimeCollection";

-- DropTable
DROP TABLE "AnimeStudio";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Creator";

-- DropTable
DROP TABLE "CuratedList";

-- DropTable
DROP TABLE "CuratedListItem";

-- DropTable
DROP TABLE "EditRequest";

-- DropTable
DROP TABLE "Favorite";

-- DropTable
DROP TABLE "ForumCategory";

-- DropTable
DROP TABLE "ForumPost";

-- DropTable
DROP TABLE "ForumThread";

-- DropTable
DROP TABLE "MyListEntry";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Playlist";

-- DropTable
DROP TABLE "PlaylistItem";

-- DropTable
DROP TABLE "Studio";

-- DropTable
DROP TABLE "WatchHistory";

-- DropTable
DROP TABLE "_UserFavoriteTags";

-- DropEnum
DROP TYPE "CuratedListType";

-- DropEnum
DROP TYPE "NotificationType";
