import { createDb } from "@huikka-stack/db";
import * as schema from "@huikka-stack/db/schema/auth";
import { env } from "@huikka-stack/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export function createAuth() {
	const db = createDb();
	const useSecureCookies = env.NODE_ENV === "production";

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "pg",

			schema: schema,
		}),
		trustedOrigins: [env.APP_URL],
		emailAndPassword: {
			enabled: true,
		},
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.SERVER_URL,
		advanced: {
			defaultCookieAttributes: {
				sameSite: useSecureCookies ? "none" : "lax",
				secure: useSecureCookies,
				httpOnly: true,
			},
		},
		plugins: [],
	});
}

export const auth = createAuth();
