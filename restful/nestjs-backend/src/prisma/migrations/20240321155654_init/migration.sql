/*
  Warnings:

  - Added the required column `folder` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "folder" TEXT NOT NULL;
