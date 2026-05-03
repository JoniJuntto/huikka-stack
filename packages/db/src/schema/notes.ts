import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./auth";

export const note = pgTable(
	"note",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		title: text("title").notNull(),
		content: text("content").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("note_user_id_idx").on(table.userId)],
);
