/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[user];

-- CreateTable
CREATE TABLE [dbo].[User] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(20),
    [password] VARCHAR(255) NOT NULL,
    [nik] VARCHAR(20),
    [nip] VARCHAR(20),
    [sobat_id] VARCHAR(20),
    [email] VARCHAR(20) NOT NULL,
    [nama] VARCHAR(255),
    [status] TINYINT,
    [status_blacklist] TINYINT,
    [no_hp] VARCHAR(20),
    [is_agree] TINYINT,
    [is_pegawai] TINYINT,
    [unit_id] INT,
    [status_nik] TINYINT,
    [created_by] VARCHAR(20),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [User_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([ID]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Indikator] (
    [indikator_id] INT NOT NULL IDENTITY(1,1),
    [branch_kd] VARCHAR(20) NOT NULL,
    [nama] VARCHAR(20) NOT NULL,
    [definisi] VARCHAR(255) NOT NULL,
    [created_by] VARCHAR(20),
    [created_at] DATETIME NOT NULL CONSTRAINT [Indikator_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [Indikator_pkey] PRIMARY KEY CLUSTERED ([indikator_id])
);

-- CreateTable
CREATE TABLE [dbo].[Kategori] (
    [kategori_id] INT NOT NULL IDENTITY(1,1),
    [nama] VARCHAR(20) NOT NULL,
    [definisi] VARCHAR(255) NOT NULL,
    [created_by] VARCHAR(20),
    [created_at] DATETIME NOT NULL CONSTRAINT [Kategori_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [Kategori_pkey] PRIMARY KEY CLUSTERED ([kategori_id])
);

-- CreateTable
CREATE TABLE [dbo].[KategoriIndikator] (
    [kategoriIndikator_id] INT NOT NULL IDENTITY(1,1),
    [branch_kd] VARCHAR(20) NOT NULL,
    [kategori_id] INT NOT NULL,
    [indikator_id] INT NOT NULL,
    [bobot] VARCHAR(50) NOT NULL,
    [created_by] VARCHAR(20),
    [created_at] DATETIME NOT NULL CONSTRAINT [KategoriIndikator_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [KategoriIndikator_pkey] PRIMARY KEY CLUSTERED ([kategoriIndikator_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[KategoriIndikator] ADD CONSTRAINT [KategoriIndikator_kategori_id_fkey] FOREIGN KEY ([kategori_id]) REFERENCES [dbo].[Kategori]([kategori_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[KategoriIndikator] ADD CONSTRAINT [KategoriIndikator_indikator_id_fkey] FOREIGN KEY ([indikator_id]) REFERENCES [dbo].[Indikator]([indikator_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
