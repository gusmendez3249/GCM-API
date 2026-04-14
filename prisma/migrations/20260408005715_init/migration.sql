-- CreateTable
CREATE TABLE `Logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statusCode` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `path` VARCHAR(191) NULL,
    `error` MEDIUMTEXT NOT NULL,
    `errorCode` MEDIUMTEXT NULL,
    `session_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Logs` ADD CONSTRAINT `Logs_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
