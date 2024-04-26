/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `adress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "adress_user_id_key" ON "adress"("user_id");
