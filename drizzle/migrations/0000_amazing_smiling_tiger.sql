CREATE TABLE `memo` (
	`id` text PRIMARY KEY NOT NULL,
	`subject` text,
	`submitted_on` integer,
	`archived` integer DEFAULT false,
	`author_user_id` integer NOT NULL,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	`updated_at` integer DEFAULT (cast (unixepoch () as int)),
	FOREIGN KEY (`author_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `page` (
	`id` text PRIMARY KEY NOT NULL,
	`number` integer,
	`content` text,
	`memo_id` integer NOT NULL,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	`updated_at` integer DEFAULT (cast (unixepoch () as int)),
	FOREIGN KEY (`memo_id`) REFERENCES `memo`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `review_comment` (
	`id` text PRIMARY KEY NOT NULL,
	`memo_id` integer NOT NULL,
	`reviewer_user_id` integer NOT NULL,
	`content` text,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	`updated_at` integer DEFAULT (cast (unixepoch () as int)),
	FOREIGN KEY (`memo_id`) REFERENCES `memo`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reviewer_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reviewers` (
	`id` text PRIMARY KEY NOT NULL,
	`memo_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`reviewed_on` integer,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	`updated_at` integer DEFAULT (cast (unixepoch () as int)),
	FOREIGN KEY (`memo_id`) REFERENCES `memo`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text,
	`email` text,
	`banned` integer DEFAULT false,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	`updated_at` integer DEFAULT (cast (unixepoch () as int))
);
--> statement-breakpoint
CREATE INDEX `author_user_idx` ON `memo` (`author_user_id`);--> statement-breakpoint
CREATE INDEX `page_memo_idx` ON `page` (`memo_id`);--> statement-breakpoint
CREATE INDEX `reviewer_memo_idx` ON `reviewers` (`memo_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `user` (`user_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `user` (`email`);