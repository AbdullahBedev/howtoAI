-- AlterTable
ALTER TABLE "TutorialProgress" ADD COLUMN     "completedSections" TEXT[],
ADD COLUMN     "metadata" JSONB DEFAULT '{}';
