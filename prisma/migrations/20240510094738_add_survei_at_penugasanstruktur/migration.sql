/*
  Warnings:

  - Added the required column `is_final` to the `NilaiKategoriIndikator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun` to the `NilaiKategoriIndikator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `survei_kd` to the `PenugasanStruktur` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Indikator] ALTER COLUMN [definisi] VARCHAR(2500) NULL;

-- AlterTable
ALTER TABLE [dbo].[Kategori] ALTER COLUMN [definisi] VARCHAR(2500) NULL;

-- AlterTable
ALTER TABLE [dbo].[KategoriIndikator] ALTER COLUMN [bobot] DECIMAL(4,3) NULL;

-- AlterTable
ALTER TABLE [dbo].[NilaiKategoriIndikator] ALTER COLUMN [nilai] TINYINT NULL;
ALTER TABLE [dbo].[NilaiKategoriIndikator] ADD [is_final] BIT NOT NULL,
[tahun] VARCHAR(4) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[PenugasanStruktur] ADD [survei_kd] VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[RankMitra] ALTER COLUMN [nilai] DECIMAL(6,5) NULL;

-- AlterTable
ALTER TABLE [dbo].[RankMitraPosKegSurvei] ALTER COLUMN [nilai] DECIMAL(6,5) NULL;

-- AlterTable
ALTER TABLE [dbo].[RankMitraTahunKerja] ALTER COLUMN [nilai] DECIMAL(6,5) NULL;

-- AddForeignKey
ALTER TABLE [dbo].[PenugasanStruktur] ADD CONSTRAINT [PenugasanStruktur_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
