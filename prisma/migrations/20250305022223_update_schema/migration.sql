/*
  Warnings:

  - You are about to drop the column `completed` on the `TutorialProgress` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `Achievement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('TUTORIAL_COMPLETION', 'PROMPT_MASTERY', 'LEARNING_STREAK');

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "type",
ADD COLUMN     "type" "AchievementType" NOT NULL;

-- AlterTable
ALTER TABLE "TutorialProgress" DROP COLUMN "completed",
ADD COLUMN     "completedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "passwordHash" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
