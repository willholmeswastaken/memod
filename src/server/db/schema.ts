// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const memos = sqliteTable(
	"memo",
	{
		id: text("id").primaryKey(),
		subject: text("subject"),
		submittedOn: integer("submitted_on", { mode: "timestamp" }),
		archived: integer("archived", { mode: "boolean" }).default(false),
		authorUserId: integer("author_user_id")
			.notNull()
			.references(() => users.id),
		createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
		updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
	},
	(memos) => ({
		authorUserIdx: index("author_user_idx").on(memos.authorUserId),
	}),
);

export const memosRelations = relations(memos, ({ many, one }) => ({
	user: one(users, {
		fields: [memos.authorUserId],
		references: [users.id],
	}),
	pages: many(pages),
	reviewers: many(reviewers),
}));

export const pages = sqliteTable(
	"page",
	{
		id: text("id").primaryKey(),
		number: integer("number"),
		content: text("content"),
		memoId: integer("memo_id")
			.notNull()
			.references(() => memos.id),
		createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
		updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
	},
	(pages) => ({
		pageMemoIdx: index("page_memo_idx").on(pages.memoId),
	}),
);

export const pagesRelations = relations(pages, ({ one }) => ({
	memo: one(memos, {
		fields: [pages.memoId],
		references: [memos.id],
	}),
}));

export const users = sqliteTable(
	"user",
	{
		id: text("id").primaryKey(),
		userId: text("user_id"),
		name: text("name"),
		email: text("email"),
		banned: integer("banned", { mode: "boolean" }).default(false),
		createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
		updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
	},
	(users) => ({
		userIdx: index("user_idx").on(users.userId),
		emailIdx: index("email_idx").on(users.email),
	}),
);

export const reviewers = sqliteTable(
	"reviewers",
	{
		id: text("id").primaryKey(),
		memoId: integer("memo_id")
			.notNull()
			.references(() => memos.id),
		userId: integer("user_id")
			.notNull()
			.references(() => users.id),
		reviewedOn: integer("reviewed_on", { mode: "timestamp" }),
		createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
		updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
	},
	(reviewers) => ({
		reviewerMemoIdx: index("reviewer_memo_idx").on(reviewers.memoId),
	}),
);

export const reviewersRelations = relations(reviewers, ({ many, one }) => ({
	memo: one(memos, {
		fields: [reviewers.memoId],
		references: [memos.id],
	}),
	reviewer: one(users, {
		fields: [reviewers.userId],
		references: [users.id],
	}),
	comments: many(reviewComments),
}));

export const reviewComments = sqliteTable("review_comment", {
	id: text("id").primaryKey(),
	memoId: integer("memo_id")
		.notNull()
		.references(() => memos.id),
	reviewerUserId: integer("reviewer_user_id")
		.notNull()
		.references(() => users.id),
	content: text("content"),
	createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
	updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
});

export const reviewCommentsRelations = relations(reviewComments, ({ one }) => ({
	memo: one(memos, {
		fields: [reviewComments.memoId],
		references: [memos.id],
	}),
	reviewer: one(users, {
		fields: [reviewComments.reviewerUserId],
		references: [users.id],
	}),
}));
