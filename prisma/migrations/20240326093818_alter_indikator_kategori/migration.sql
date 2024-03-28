/*
  Warnings:

  - You are about to drop the column `bobot` on the `Kategori` table. All the data in the column will be lost.
  - You are about to drop the column `no_urut` on the `Kategori` table. All the data in the column will be lost.
  - You are about to drop the column `perbandingan` on the `Kategori` table. All the data in the column will be lost.
  - You are about to alter the column `bobot` on the `KategoriIndikator` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Decimal(3,3)`.
  - Added the required column `no_urut` to the `KategoriIndikator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perbandingan` to the `KategoriIndikator` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Kategori] DROP COLUMN [bobot],
[no_urut],
[perbandingan];

-- AlterTable
ALTER TABLE [dbo].[KategoriIndikator] ALTER COLUMN [bobot] DECIMAL(3,3) NULL;
ALTER TABLE [dbo].[KategoriIndikator] ADD [no_urut] TINYINT NOT NULL,
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
