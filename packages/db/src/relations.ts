import { defineRelations } from "drizzle-orm";

import { account, note, session, user } from "./schema";

export const dbRelations = defineRelations(
	{ user, session, account, note },
	(r) => ({
		user: {
			sessions: r.many.session({
				from: r.user.id,
				to: r.session.userId,
			}),
			accounts: r.many.account({
				from: r.user.id,
				to: r.account.userId,
			}),
			notes: r.many.note({
				from: r.user.id,
				to: r.note.userId,
			}),
		},
		session: {
			user: r.one.user({
				from: r.session.userId,
				to: r.user.id,
			}),
		},
		account: {
			user: r.one.user({
				from: r.account.userId,
				to: r.user.id,
			}),
		},
		note: {
			user: r.one.user({
				from: r.note.userId,
				to: r.user.id,
			}),
		},
	}),
);
