import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		APP_URL: z.url().default("http://localhost:3001"),
		SERVER_URL: z.url().default("http://localhost:3000"),
		SERVER_HOST: z.string().min(1).default("0.0.0.0"),
		SERVER_PORT: z.coerce.number().int().positive().default(3000),
		DATABASE_URL: z
			.string()
			.min(1)
			.default("postgresql://postgres:password@localhost:5432/huikka-stack"),
		BETTER_AUTH_SECRET: z
			.string()
			.min(32)
			.default("change-me-in-production-this-secret-is-dev-only"),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
