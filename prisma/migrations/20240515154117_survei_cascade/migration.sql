BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[JumPosisiPetugasKegSurvei] DROP CONSTRAINT [JumPosisiPetugasKegSurvei_survei_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[KegSurvei] DROP CONSTRAINT [KegSurvei_survei_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[NilaiKategoriIndikator] DROP CONSTRAINT [NilaiKategoriIndikator_survei_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PenugasanStruktur] DROP CONSTRAINT [PenugasanStruktur_survei_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PetugasKinerjaSurvei] DROP CONSTRAINT [PetugasKinerjaSurvei_survei_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PetugasSurvei] DROP CONSTRAINT [PetugasSurvei_survei_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PosKegSurvei] DROP CONSTRAINT [PosKegSurvei_survei_kd_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[RankMitraJumPosisiPetugasKegSurvei] DROP CONSTRAINT [RankMitraJumPosisiPetugasKegSurvei_survei_kd_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[KegSurvei] ADD CONSTRAINT [KegSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PosKegSurvei] ADD CONSTRAINT [PosKegSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JumPosisiPetugasKegSurvei] ADD CONSTRAINT [JumPosisiPetugasKegSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PetugasSurvei] ADD CONSTRAINT [PetugasSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PetugasKinerjaSurvei] ADD CONSTRAINT [PetugasKinerjaSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PenugasanStruktur] ADD CONSTRAINT [PenugasanStruktur_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[NilaiKategoriIndikator] ADD CONSTRAINT [NilaiKategoriIndikator_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraJumPosisiPetugasKegSurvei] ADD CONSTRAINT [RankMitraJumPosisiPetugasKegSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
