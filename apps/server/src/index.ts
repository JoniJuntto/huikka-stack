import { cors } from "@elysiajs/cors";
import { auth } from "@huikka-stack/auth";
import { checkDatabaseConnection } from "@huikka-stack/db";
import { env } from "@huikka-stack/env/server";
import { Elysia } from "elysia";
import { initLogger } from "evlog";
import {
	type BetterAuthInstance,
	createAuthMiddleware,
} from "evlog/better-auth";
import { evlog } from "evlog/elysia";

initLogger({
	env: { service: "huikka-stack-server" },
});

const identifyUser = createAuthMiddleware(auth as BetterAuthInstance, {
	exclude: ["/api/auth/**"],
	maskEmail: true,
});

type AppDependencies = {
	checkDatabase?: () => Promise<void>;
};

export function createApp({
	checkDatabase = checkDatabaseConnection,
}: AppDependencies = {}) {
	return new Elysia()
		.use(evlog())
		.derive(async ({ request, log }) => {
			await identifyUser(log, request.headers, new URL(request.url).pathname);
			return {};
		})
		.use(
			cors({
				origin: env.APP_URL,
				methods: ["GET", "POST", "OPTIONS"],
				allowedHeaders: ["Content-Type", "Authorization"],
				credentials: true,
			}),
		)
		.get("/healthz", () => ({
			service: "huikka-stack-server",
			status: "ok",
		}))
		.get("/readyz", async ({ set }) => {
			try {
				await checkDatabase();

				return {
					service: "huikka-stack-server",
					status: "ok",
				};
			} catch {
				set.status = 503;

				return {
					reason: "database_unavailable",
					service: "huikka-stack-server",
					status: "error",
				};
			}
		})
		.all("/api/auth/*", async (context) => {
			const { request, status } = context;
			if (["POST", "GET"].includes(request.method)) {
				return auth.handler(request);
			}
			return status(405);
		});
}

export const app = createApp();

if (import.meta.main) {
	app.listen(
		{
			hostname: env.SERVER_HOST,
			port: env.SERVER_PORT,
		},
		(server) => {
			console.log(
				`Server is running on http://${server.hostname}:${server.port}`,
			);
		},
	);
}
