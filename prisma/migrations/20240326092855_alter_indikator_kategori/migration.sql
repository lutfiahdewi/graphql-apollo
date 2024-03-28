/*
  Warnings:

  - Added the required column `isBenefit` to the `Indikator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_urut` to the `Kategori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perbandingan` to the `Kategori` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Indikator] ADD [isBenefit] BIT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Kategori] ADD [bobot] DECIMAL(3,3),
[no_urut] TINYINT NOT NULL,
[perbandingan] VARCHAR(100) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
