/*
  Warnings:

  - You are about to drop the column `keg_kd` on the `RankMitraTahunKerja` table. All the data in the column will be lost.
  - You are about to drop the column `posisi_kd` on the `RankMitraTahunKerja` table. All the data in the column will be lost.
  - You are about to drop the column `survei_kd` on the `RankMitraTahunKerja` table. All the data in the column will be lost.
  - You are about to drop the `RankMitraPosKegSurvei` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kategori_id` to the `RankMitraTahunKerja` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[RankMitraPosKegSurvei] DROP CONSTRAINT [RankMitraPosKegSurvei_keg_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[RankMitraPosKegSurvei] DROP CONSTRAINT [RankMitraPosKegSurvei_posisi_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[RankMitraPosKegSurvei] DROP CONSTRAINT [RankMitraPosKegSurvei_survei_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[RankMitraPosKegSurvei] DROP CONSTRAINT [RankMitraPosKegSurvei_username_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[RankMitraTahunKerja] DROP CONSTRAINT [RankMitraTahunKerja_keg_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[RankMitraTahunKerja] DROP CONSTRAINT [RankMitraTahunKerja_posisi_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[RankMitraTahunKerja] DROP CONSTRAINT [RankMitraTahunKerja_survei_kd_fkey];

-- AlterTable
ALTER TABLE [dbo].[RankMitraTahunKerja] DROP COLUMN [keg_kd],
[posisi_kd],
[survei_kd];
ALTER TABLE [dbo].[RankMitraTahunKerja] ADD [kategori_id] INT NOT NULL;

-- DropTable
DROP TABLE [dbo].[RankMitraPosKegSurvei];

-- CreateTable
CREATE TABLE [dbo].[RankMitraJumPosisiPetugasKegSurvei] (
    [rankmitraposkegsurvei_id] INT NOT NULL IDENTITY(1,1),
    [survei_kd] VARCHAR(20) NOT NULL,
    [keg_kd] VARCHAR(10) NOT NULL,
    [branch_kd] VARCHAR(20) NOT NULL,
    [posisi_kd] VARCHAR(10) NOT NULL,
    [username] VARCHAR(20) NOT NULL,
    [nilai] DECIMAL(6,5),
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [RankMitraJumPosisiPetugasKegSurvei_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [RankMitraJumPosisiPetugasKegSurvei_pkey] PRIMARY KEY CLUSTERED ([rankmitraposkegsurvei_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraTahunKerja] ADD CONSTRAINT [RankMitraTahunKerja_kategori_id_fkey] FOREIGN KEY ([kategori_id]) REFERENCES [dbo].[Kategori]([kategori_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraJumPosisiPetugasKegSurvei] ADD CONSTRAINT [RankMitraJumPosisiPetugasKegSurvei_keg_kd_fkey] FOREIGN KEY ([keg_kd]) REFERENCES [dbo].[Kegiatan]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraJumPosisiPetugasKegSurvei] ADD CONSTRAINT [RankMitraJumPosisiPetugasKegSurvei_posisi_kd_fkey] FOREIGN KEY ([posisi_kd]) REFERENCES [dbo].[Posisi]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraJumPosisiPetugasKegSurvei] ADD CONSTRAINT [RankMitraJumPosisiPetugasKegSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraJumPosisiPetugasKegSurvei] ADD CONSTRAINT [RankMitraJumPosisiPetugasKegSurvei_username_fkey] FOREIGN KEY ([username]) REFERENCES [dbo].[User]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
