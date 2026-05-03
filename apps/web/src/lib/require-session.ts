import { redirect } from "@tanstack/react-router";

import { hasSession } from "./session-guard";

export type AppSession = {
	session: {
		id: string;
	};
	user: {
		id: string;
		name: string;
		email: string;
		image?: string | null;
	};
};

export function requireSession(
	session: AppSession | null | undefined,
): AppSession {
	if (!hasSession(session)) {
		throw redirect({
			to: "/login",
		});
	}

	return session;
}
