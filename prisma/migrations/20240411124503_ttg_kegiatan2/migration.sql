BEGIN TRY BEGIN TRAN;

-- AlterTable
ALTER TABLE
    [dbo].[Indikator] DROP CONSTRAINT [Indikator_created_at_df];

ALTER TABLE
    [dbo].[Indikator]
ADD
    CONSTRAINT [Indikator_created_at_df] DEFAULT CURRENT_TIMESTAMP FOR [created_at];

-- AlterTable
ALTER TABLE
    [dbo].[Kategori] DROP CONSTRAINT [Kategori_created_at_df];

ALTER TABLE
    [dbo].[Kategori]
ADD
    CONSTRAINT [Kategori_created_at_df] DEFAULT CURRENT_TIMESTAMP FOR [created_at];

-- AlterTable
ALTER TABLE
    [dbo].[User] DROP CONSTRAINT [User_created_at_df];

ALTER TABLE
    [dbo].[User]
ADD
    CONSTRAINT [User_created_at_df] DEFAULT CURRENT_TIMESTAMP FOR [created_at];

-- AlterTable
ALTER TABLE
    [dbo].[UserRole] DROP CONSTRAINT [UserRole_created_at_df];

ALTER TABLE
    [dbo].[UserRole]
ADD
    CONSTRAINT [UserRole_created_at_df] DEFAULT CURRENT_TIMESTAMP FOR [created_at];

-- CreateTable
CREATE TABLE [dbo].[Survei] (
    [survei_id] INT NOT NULL IDENTITY(1, 1),
    [kode] VARCHAR(20) NOT NULL,
    [nama] VARCHAR(255) NOT NULL,
    [tahun] VARCHAR(4) NOT NULL,
    [tipe] TINYINT NOT NULL,
    [unit_kd] VARCHAR(20),
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [Survei_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [Survei_pkey] PRIMARY KEY CLUSTERED ([survei_id]),
    CONSTRAINT [Survei_kode_key] UNIQUE NONCLUSTERED ([kode])
);

-- CreateTable
CREATE TABLE [dbo].[Kegiatan] (
    [kegiatan_id] INT NOT NULL IDENTITY(1, 1),
    [kode] VARCHAR(10) NOT NULL,
    [nama] VARCHAR(255) NOT NULL,
    [deskripsi] VARCHAR(255) NOT NULL,
    [status] TINYINT NOT NULL,
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [Kegiatan_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [Kegiatan_pkey] PRIMARY KEY CLUSTERED ([kegiatan_id]),
    CONSTRAINT [Kegiatan_kode_key] UNIQUE NONCLUSTERED ([kode])
);

-- CreateTable
CREATE TABLE [dbo].[KegSurvei] (
    [kegsurvei_id] INT NOT NULL IDENTITY(1, 1),
    [survei_kd] VARCHAR(20) NOT NULL,
    [keg_kd] VARCHAR(10) NOT NULL,
    [status] TINYINT NOT NULL,
    [tgl_buka] DATETIME,
    [tgl_rek_mulai] DATETIME,
    [tgl_rek_selesai] DATETIME,
    [tgl_mulai] DATETIME,
    [tgl_selesai] DATETIME,
    [is_rekrutmen] TINYINT,
    [is_multi] TINYINT,
    [is_confirm] BIT,
    [is_add_indicator] BIT,
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [KegSurvei_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [KegSurvei_pkey] PRIMARY KEY CLUSTERED ([kegsurvei_id])
);

-- CreateTable
CREATE TABLE [dbo].[Posisi] (
    [posisi_id] INT NOT NULL IDENTITY(1, 1),
    [kode] VARCHAR(10) NOT NULL,
    [nama] VARCHAR(100) NOT NULL,
    [deskripsi] VARCHAR(100) NOT NULL,
    [status] TINYINT NOT NULL,
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [Posisi_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [Posisi_pkey] PRIMARY KEY CLUSTERED ([posisi_id]),
    CONSTRAINT [Posisi_kode_key] UNIQUE NONCLUSTERED ([kode])
);

-- CreateTable
CREATE TABLE [dbo].[PosKegSurvei] (
    [poskegsurvei_id] INT NOT NULL IDENTITY(1, 1),
    [survei_kd] VARCHAR(20) NOT NULL,
    [keg_kd] VARCHAR(10) NOT NULL,
    [posisi_kd] VARCHAR(10) NOT NULL,
    [urutan] TINYINT,
    [is_view_mitra] TINYINT,
    [is_multi] TINYINT,
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [PosKegSurvei_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [PosKegSurvei_pkey] PRIMARY KEY CLUSTERED ([poskegsurvei_id])
);

-- CreateTable
CREATE TABLE [dbo].[JumPosisiPetugasKegSurvei] (
    [jumposisipetugaskegsurvei_id] INT NOT NULL IDENTITY(1, 1),
    [survei_kd] VARCHAR(20) NOT NULL,
    [keg_kd] VARCHAR(10) NOT NULL,
    [unit_kd] VARCHAR(20),
    [branch_kd] VARCHAR(20) NOT NULL,
    [kategori_id] INT NOT NULL,
    [jumlah] SMALLINT NOT NULL,
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [JumPosisiPetugasKegSurvei_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [JumPosisiPetugasKegSurvei_pkey] PRIMARY KEY CLUSTERED ([jumposisipetugaskegsurvei_id])
);

-- CreateTable
CREATE TABLE [dbo].[PetugasSurvei] (
    [petugassurvei_id] INT NOT NULL IDENTITY(1, 1),
    [survei_kd] VARCHAR(20) NOT NULL,
    [keg_kd] VARCHAR(10) NOT NULL,
    [branch_kd] VARCHAR(20) NOT NULL,
    [posisi_kd] VARCHAR(10) NOT NULL,
    [username] VARCHAR(20) NOT NULL,
    [status] TINYINT NOT NULL,
    [created_by] VARCHAR(20) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [PetugasSurvei_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [PetugasSurvei_pkey] PRIMARY KEY CLUSTERED ([petugassurvei_id])
);

-- AddForeignKey
ALTER TABLE
    [dbo].[KegSurvei]
ADD
    CONSTRAINT [KegSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[KegSurvei]
ADD
    CONSTRAINT [KegSurvei_keg_kd_fkey] FOREIGN KEY ([keg_kd]) REFERENCES [dbo].[Kegiatan]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[PosKegSurvei]
ADD
    CONSTRAINT [PosKegSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[PosKegSurvei]
ADD
    CONSTRAINT [PosKegSurvei_keg_kd_fkey] FOREIGN KEY ([keg_kd]) REFERENCES [dbo].[Kegiatan]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[PosKegSurvei]
ADD
    CONSTRAINT [PosKegSurvei_posisi_kd_fkey] FOREIGN KEY ([posisi_kd]) REFERENCES [dbo].[Posisi]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[JumPosisiPetugasKegSurvei]
ADD
    CONSTRAINT [JumPosisiPetugasKegSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[JumPosisiPetugasKegSurvei]
ADD
    CONSTRAINT [JumPosisiPetugasKegSurvei_keg_kd_fkey] FOREIGN KEY ([keg_kd]) REFERENCES [dbo].[Kegiatan]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[JumPosisiPetugasKegSurvei]
ADD
    CONSTRAINT [JumPosisiPetugasKegSurvei_kategori_id_fkey] FOREIGN KEY ([kategori_id]) REFERENCES [dbo].[Kategori]([kategori_id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[PetugasSurvei]
ADD
    CONSTRAINT [PetugasSurvei_survei_kd_fkey] FOREIGN KEY ([survei_kd]) REFERENCES [dbo].[Survei]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[PetugasSurvei]
ADD
    CONSTRAINT [PetugasSurvei_keg_kd_fkey] FOREIGN KEY ([keg_kd]) REFERENCES [dbo].[Kegiatan]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[PetugasSurvei]
ADD
    CONSTRAINT [PetugasSurvei_posisi_kd_fkey] FOREIGN KEY ([posisi_kd]) REFERENCES [dbo].[Posisi]([kode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    [dbo].[PetugasSurvei]
ADD
    CONSTRAINT [PetugasSurvei_username_fkey] FOREIGN KEY ([username]) REFERENCES [dbo].[User]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY BEGIN CATCH IF @@TRANCOUNT > 0 BEGIN ROLLBACK TRAN;

END;

THROW
END CATCH