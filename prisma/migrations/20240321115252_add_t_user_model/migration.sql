BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tUser] (
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
    [created_at] DATETIME2 NOT NULL CONSTRAINT [tUser_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_by] VARCHAR(20),
    [updated_at] DATETIME,
    CONSTRAINT [tUser_pkey] PRIMARY KEY CLUSTERED ([ID]),
    CONSTRAINT [tUser_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [tUser_sobat_id_key] UNIQUE NONCLUSTERED ([sobat_id]),
    CONSTRAINT [tUser_email_key] UNIQUE NONCLUSTERED ([email])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
