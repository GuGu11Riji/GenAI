CREATE TABLE `academic_papers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`paperId` varchar(128) NOT NULL,
	`title` text NOT NULL,
	`authors` json DEFAULT ('[]'),
	`venue` varchar(128),
	`year` int,
	`citations` int DEFAULT 0,
	`abstract` text,
	`arxivId` varchar(64),
	`tags` json DEFAULT ('[]'),
	`externalUrl` varchar(512),
	`lastFetched` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `academic_papers_id` PRIMARY KEY(`id`),
	CONSTRAINT `academic_papers_paperId_unique` UNIQUE(`paperId`)
);
--> statement-breakpoint
CREATE TABLE `chat_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`userId` int,
	`role` enum('user','assistant','system') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fetch_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`source` varchar(64) NOT NULL,
	`status` enum('success','error','partial') NOT NULL,
	`itemsCount` int DEFAULT 0,
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `fetch_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trending_projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`githubId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`description` text,
	`descriptionZh` text,
	`stars` int NOT NULL DEFAULT 0,
	`forks` int NOT NULL DEFAULT 0,
	`language` varchar(64),
	`topics` json DEFAULT ('[]'),
	`githubUrl` varchar(512) NOT NULL,
	`category` varchar(128),
	`trend` enum('hot','rising','stable') NOT NULL DEFAULT 'stable',
	`weeklyGrowth` int DEFAULT 0,
	`paperIds` json DEFAULT ('[]'),
	`isActive` boolean NOT NULL DEFAULT true,
	`lastFetched` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trending_projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `trending_projects_githubId_unique` UNIQUE(`githubId`)
);
