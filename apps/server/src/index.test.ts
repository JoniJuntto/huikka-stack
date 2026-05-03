import { describe, expect, test } from "bun:test";

import { createApp } from "./index";

describe("server smoke checks", () => {
	test("GET /healthz returns liveness", async () => {
		const app = createApp({
			checkDatabase: async () => {},
		});

		const response = await app.handle(new Request("http://localhost/healthz"));

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			service: "huikka-stack-server",
			status: "ok",
		});
	});

	test("GET /readyz returns readiness when the database check passes", async () => {
		const app = createApp({
			checkDatabase: async () => {},
		});

		const response = await app.handle(new Request("http://localhost/readyz"));

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			service: "huikka-stack-server",
			status: "ok",
		});
	});

	test("GET /readyz returns 503 when the database check fails", async () => {
		const app = createApp({
			checkDatabase: async () => {
				throw new Error("database unavailable");
			},
		});

		const response = await app.handle(new Request("http://localhost/readyz"));

		expect(response.status).toBe(503);
		expect(await response.json()).toEqual({
			reason: "database_unavailable",
			service: "huikka-stack-server",
			status: "error",
		});
	});

	test("auth routes stay mounted", async () => {
		const app = createApp({
			checkDatabase: async () => {},
		});

		const response = await app.handle(
			new Request("http://localhost/api/auth/session", {
				method: "PUT",
			}),
		);

		expect(response.status).toBe(405);
	});
});
