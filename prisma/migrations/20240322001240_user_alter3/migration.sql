/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[user] DROP CONSTRAINT [user_sobat_id_key];

-- CreateIndex
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_username_key] UNIQUE NONCLUSTERED ([username]);

-- CreateIndex
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_email_key] UNIQUE NONCLUSTERED ([email]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
