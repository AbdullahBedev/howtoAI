/*
  Warnings:

  - You are about to drop the column `progress` on the `TutorialProgress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Achievement" ALTER COLUMN "imageUrl" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Tutorial" ALTER COLUMN "duration" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "TutorialProgress" DROP COLUMN "progress",
ADD COLUMN     "progressValue" DOUBLE PRECISION NOT NULL DEFAULT 0;
