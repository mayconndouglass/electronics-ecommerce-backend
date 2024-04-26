/*
  Warnings:

  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "cpf" INTEGER,
ADD COLUMN     "person_type" TEXT;

-- CreateTable
CREATE TABLE "adress" (
    "id" TEXT NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT NOT NULL,

    CONSTRAINT "adress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones" (
    "addressId" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("addressId","phone_number")
);

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "adress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
