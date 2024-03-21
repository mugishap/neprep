-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "verification_status" AS ENUM ('VERIFIED', 'PENDING', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "password_reset_status" AS ENUM ('PENDING', 'IDLE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "password" TEXT NOT NULL,
    "profile_picture_id" TEXT,
    "role" "roles" NOT NULL,
    "verification_status" "verification_status" NOT NULL DEFAULT 'UNVERIFIED',
    "verification_code" TEXT,
    "verification_expires" TIMESTAMP(3),
    "password_reset_status" "password_reset_status" NOT NULL DEFAULT 'IDLE',
    "password_reset_code" TEXT,
    "password_reset_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profile_picture_id_fkey" FOREIGN KEY ("profile_picture_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
