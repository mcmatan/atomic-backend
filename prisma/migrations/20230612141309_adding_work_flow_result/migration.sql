/*
  Warnings:

  - You are about to drop the column `jobId` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workflowId` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_jobId_fkey";

-- DropIndex
DROP INDEX "Workflow_idempotentKey_name_key";

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "jobId",
ADD COLUMN     "workflowId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "completedDate" TIMESTAMP(3),
ADD COLUMN     "result" JSONB;

-- DropTable
DROP TABLE "Job";

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
