/*
  Warnings:

  - You are about to drop the column `isBenefit` on the `Indikator` table. All the data in the column will be lost.
  - Added the required column `is_benefit` to the `Indikator` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Indikator] DROP COLUMN [isBenefit];
ALTER TABLE [dbo].[Indikator] ADD [is_benefit] BIT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
