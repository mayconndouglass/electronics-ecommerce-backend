/*
  Warnings:

  - You are about to drop the column `promotion` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "promotion",
ADD COLUMN     "discount" TEXT,
ADD COLUMN     "promotional_price" TEXT;
