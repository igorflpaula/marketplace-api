-- DropForeignKey
ALTER TABLE `attachments` DROP FOREIGN KEY `attachments_productId_fkey`;

-- DropIndex
DROP INDEX `attachments_productId_fkey` ON `attachments`;

-- AlterTable
ALTER TABLE `attachments` MODIFY `productId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `attachments` ADD CONSTRAINT `attachments_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
