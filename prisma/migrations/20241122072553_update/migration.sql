/*
  Warnings:

  - You are about to drop the column `tagId` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_tagId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "tagId",
ADD COLUMN     "todoTagId" INTEGER;

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "TodoTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TodoTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TodoTag_name_key" ON "TodoTag"("name");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoTagId_fkey" FOREIGN KEY ("todoTagId") REFERENCES "TodoTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
