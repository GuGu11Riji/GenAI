CREATE TABLE `user_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`itemType` enum('project','paper','researcher') NOT NULL,
	`itemId` varchar(128) NOT NULL,
	`itemName` varchar(255) NOT NULL,
	`itemMeta` json DEFAULT ('{}'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_favorites_id` PRIMARY KEY(`id`)
);
