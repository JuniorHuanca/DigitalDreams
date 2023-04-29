/*
  Warnings:

  - You are about to drop the column `affiliateStatId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `AffiliateStat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AffiliateStat" DROP CONSTRAINT "AffiliateStat_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_affiliateStatId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "affiliateStatId";

-- DropTable
DROP TABLE "AffiliateStat";
