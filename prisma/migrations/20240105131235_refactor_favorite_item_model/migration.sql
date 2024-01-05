/*
  Warnings:

  - The primary key for the `favorite_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `favorite_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "favorite_items" DROP CONSTRAINT "favorite_items_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "favorite_items_pkey" PRIMARY KEY ("user_id", "product_id");
