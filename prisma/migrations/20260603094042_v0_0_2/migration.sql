/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sessionId_fkey";

-- DropIndex
DROP INDEX "Question_sessionId_sentAt_idx";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "sessionId";

-- CreateIndex
CREATE INDEX "Question_sentAt_idx" ON "Question"("sentAt");
