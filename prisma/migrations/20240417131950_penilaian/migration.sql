/*
  Warnings:

  - Added the required column `posisi_kd` to the `JumPosisiPetugasKegSurvei` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[JumPosisiPetugasKegSurvei] DROP CONSTRAINT [JumPosisiPetugasKegSurvei_kategori_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[JumPosisiPetugasKegSurvei] ADD [is_confirmed] BIT,
[posisi_kd] VARCHAR(10) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[PetugasKinerjaSurvei] (
    [petugaskinerjasurvei_id] INT NOT NULL IDENTITY(1,1),
    [survei_kd] VARCHAR(20) NOT NULL,
    [keg_kd] VARCHAR(10) NOT NULL,
    [branch_kd] VARCHAR(20) NOT NULL,
    [posisi_kd] VARCHAR(10) NOT NULL,
    [penilai] VARCHAR(20) NOT NULL,
    [nilai] TINYINT NOT NULL,
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [PetugasKinerjaSurvei_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [PetugasKinerjaSurvei_pkey] PRIMARY KEY CLUSTERED ([petugaskinerjasurvei_id])
);

-- CreateTable
CREATE TABLE [dbo].[PenugasanStruktur] (
    [penugasanstruktur_id] INT NOT NULL IDENTITY(1,1),
    [keg_kd] VARCHAR(10) NOT NULL,
    [branch_kd] VARCHAR(20) NOT NULL,
    [posisi_kd] VARCHAR(10) NOT NULL,
    [username] VARCHAR(20) NOT NULL,
    [parent] VARCHAR(20) NOT NULL,
    [status] TINYINT NOT NULL,
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [PenugasanStruktur_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [PenugasanStruktur_pkey] PRIMARY KEY CLUSTERED ([penugasanstruktur_id])
);

-- CreateTable
CREATE TABLE [dbo].[NilaiKategoriIndikator] (
    [nilaikategoriindikator_id] INT NOT NULL IDENTITY(1,1),
    [survei_kd] VARCHAR(20) NOT NULL,
    [keg_kd] VARCHAR(10) NOT NULL,
    [branch_kd] VARCHAR(20) NOT NULL,
    [posisi_kd] VARCHAR(10) NOT NULL,
    [username] VARCHAR(20) NOT NULL,
    [kategoriIndikator_id] INT NOT NULL,
    [nilai] TINYINT NOT NULL,
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [NilaiKategoriIndikator_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [NilaiKategoriIndikator_pkey] PRIMARY KEY CLUSTERED ([nilaikategoriindikator_id])
);

-- CreateTable
CREATE TABLE [dbo].[RankMitra] (
    [rankmitra_id] INT NOT NULL IDENTITY(1,1),
    [branch_kd] VARCHAR(20) NOT NULL,
    [username] VARCHAR(20) NOT NULL,
    [kategori_id] INT NOT NULL,
    [nilai] DECIMAL(5,5),
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [RankMitra_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [RankMitra_pkey] PRIMARY KEY CLUSTERED ([rankmitra_id])
);

-- CreateTable
CREATE TABLE [dbo].[MitraTahunKerja] (
    [mitratahunkerja_id] INT NOT NULL IDENTITY(1,1),
    [branch_kd] VARCHAR(20) NOT NULL,
    [username] VARCHAR(20) NOT NULL,
    [tahun] VARCHAR(4) NOT NULL,
    [status] TINYINT NOT NULL,
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [MitraTahunKerja_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [MitraTahunKerja_pkey] PRIMARY KEY CLUSTERED ([mitratahunkerja_id])
);

-- CreateTable
CREATE TABLE [dbo].[RankMitraTahunKerja] (
    [rankmitratahunkerja_id] INT NOT NULL IDENTITY(1,1),
    [survei_kd] VARCHAR(20) NOT NULL,
    [keg_kd] VARCHAR(10) NOT NULL,
    [branch_kd] VARCHAR(20) NOT NULL,
    [posisi_kd] VARCHAR(10) NOT NULL,
    [username] VARCHAR(20) NOT NULL,
    [tahun] VARCHAR(4) NOT NULL,
    [nilai] DECIMAL(5,5),
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [RankMitraTahunKerja_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [RankMitraTahunKerja_pkey] PRIMARY KEY CLUSTERED ([rankmitratahunkerja_id])
);

-- CreateTable
CREATE TABLE [dbo].[RankMitraPosKegSurvei] (
    [rankmitraposkegsurvei_id] INT NOT NULL IDENTITY(1,1),
    [survei_kd] VARCHAR(20) NOT NULL,
    [keg_kd] VARCHAR(10) NOT NULL,
    [branch_kd] VARCHAR(20) NOT NULL,
    [posisi_kd] VARCHAR(10) NOT NULL,
    [username] VARCHAR(20) NOT NULL,
    [nilai] DECIMAL(5,5),
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [RankMitraPosKegSurvei_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [RankMitraPosKegSurvei_pkey] PRIMARY KEY CLUSTERED ([rankmitraposkegsurvei_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[JumPosisiPetugasKegSurvei] ADD CONSTRAINT [JumPosisiPetugasKegSurvei_kategori_id_fkey] FOREIGN KEY ([kategori_id]) REFERENCES [dbo].[Kategori]([kategori_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JumPosisiPetugasKegSurvei] ADD CONSTRAINT [JumPosisiPetugasKegSurvei_posisi_kd_fkey] FOREIGN KEY ([posisi_kd]) REFERENCES [dbo].[Posisi]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PetugasKinerjaSurvei] ADD CONSTRAINT [PetugasKinerjaSurvei_keg_kd_fkey] FOREIGN KEY ([keg_kd]) REFERENCES [dbo].[Kegiatan]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PetugasKinerjaSurvei] ADD CONSTRAINT [PetugasKinerjaSurvei_posisi_kd_fkey] FOREIGN KEY ([posisi_kd]) REFERENCES [dbo].[Posisi]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PetugasKinerjaSurvei] ADD CONSTRAINT [PetugasKinerjaSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PetugasKinerjaSurvei] ADD CONSTRAINT [PetugasKinerjaSurvei_penilai_fkey] FOREIGN KEY ([penilai]) REFERENCES [dbo].[User]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PenugasanStruktur] ADD CONSTRAINT [PenugasanStruktur_keg_kd_fkey] FOREIGN KEY ([keg_kd]) REFERENCES [dbo].[Kegiatan]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PenugasanStruktur] ADD CONSTRAINT [PenugasanStruktur_posisi_kd_fkey] FOREIGN KEY ([posisi_kd]) REFERENCES [dbo].[Posisi]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PenugasanStruktur] ADD CONSTRAINT [PenugasanStruktur_username_fkey] FOREIGN KEY ([username]) REFERENCES [dbo].[User]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[NilaiKategoriIndikator] ADD CONSTRAINT [NilaiKategoriIndikator_keg_kd_fkey] FOREIGN KEY ([keg_kd]) REFERENCES [dbo].[Kegiatan]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[NilaiKategoriIndikator] ADD CONSTRAINT [NilaiKategoriIndikator_posisi_kd_fkey] FOREIGN KEY ([posisi_kd]) REFERENCES [dbo].[Posisi]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[NilaiKategoriIndikator] ADD CONSTRAINT [NilaiKategoriIndikator_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[NilaiKategoriIndikator] ADD CONSTRAINT [NilaiKategoriIndikator_username_fkey] FOREIGN KEY ([username]) REFERENCES [dbo].[User]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[NilaiKategoriIndikator] ADD CONSTRAINT [NilaiKategoriIndikator_kategoriIndikator_id_fkey] FOREIGN KEY ([kategoriIndikator_id]) REFERENCES [dbo].[KategoriIndikator]([kategoriIndikator_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitra] ADD CONSTRAINT [RankMitra_username_fkey] FOREIGN KEY ([username]) REFERENCES [dbo].[User]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitra] ADD CONSTRAINT [RankMitra_kategori_id_fkey] FOREIGN KEY ([kategori_id]) REFERENCES [dbo].[Kategori]([kategori_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MitraTahunKerja] ADD CONSTRAINT [MitraTahunKerja_username_fkey] FOREIGN KEY ([username]) REFERENCES [dbo].[User]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraTahunKerja] ADD CONSTRAINT [RankMitraTahunKerja_keg_kd_fkey] FOREIGN KEY ([keg_kd]) REFERENCES [dbo].[Kegiatan]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraTahunKerja] ADD CONSTRAINT [RankMitraTahunKerja_posisi_kd_fkey] FOREIGN KEY ([posisi_kd]) REFERENCES [dbo].[Posisi]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraTahunKerja] ADD CONSTRAINT [RankMitraTahunKerja_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraTahunKerja] ADD CONSTRAINT [RankMitraTahunKerja_username_fkey] FOREIGN KEY ([username]) REFERENCES [dbo].[User]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraPosKegSurvei] ADD CONSTRAINT [RankMitraPosKegSurvei_keg_kd_fkey] FOREIGN KEY ([keg_kd]) REFERENCES [dbo].[Kegiatan]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraPosKegSurvei] ADD CONSTRAINT [RankMitraPosKegSurvei_posisi_kd_fkey] FOREIGN KEY ([posisi_kd]) REFERENCES [dbo].[Posisi]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraPosKegSurvei] ADD CONSTRAINT [RankMitraPosKegSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RankMitraPosKegSurvei] ADD CONSTRAINT [RankMitraPosKegSurvei_username_fkey] FOREIGN KEY ([username]) REFERENCES [dbo].[User]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
