/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Workflow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idempotentKey,name]` on the table `Workflow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idempotentKey` to the `Workflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Workflow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "idempotentKey" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_userId_name_key" ON "Workflow"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_idempotentKey_name_key" ON "Workflow"("idempotentKey", "name");
