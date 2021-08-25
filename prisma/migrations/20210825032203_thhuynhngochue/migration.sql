-- CreateTable
CREATE TABLE `role` (
    `role` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(200) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `status` VARCHAR(45),
    `createDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updateDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `accRole` VARCHAR(45) NOT NULL,
    `note` TEXT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(30),
    `avatar` TEXT,
    `position` VARCHAR(200) NOT NULL,
    `description` TEXT,
    `address` VARCHAR(200),
    `team` VARCHAR(40),
    `facebook` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `notiId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `content` VARCHAR(200) NOT NULL,
    `link` TEXT,
    `createDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updateDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`notiId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news_event` (
    `newsId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `content` TEXT,
    `link` TEXT,
    `category` ENUM('SCHOOL', 'EDUCATION', 'EVENT', 'COMMON') NOT NULL DEFAULT 'COMMON',
    `createDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updateDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`newsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link` TEXT,
    `notificatioId` INTEGER,
    `newId` INTEGER,
    `createDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updateDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `typeImage` ENUM('NEWS', 'NOTI', 'EVENT', 'ALBUM') DEFAULT 'ALBUM',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account` ADD FOREIGN KEY (`accRole`) REFERENCES `role`(`role`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD FOREIGN KEY (`notificatioId`) REFERENCES `notification`(`notiId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD FOREIGN KEY (`newId`) REFERENCES `news_event`(`newsId`) ON DELETE SET NULL ON UPDATE CASCADE;
