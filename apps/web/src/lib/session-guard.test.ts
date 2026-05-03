import { describe, expect, test } from "bun:test";

import { hasSession } from "./session-guard";

describe("hasSession", () => {
	test("returns true when a user id is present", () => {
		expect(
			hasSession({
				user: {
					id: "user_123",
				},
			}),
		).toBe(true);
	});

	test("returns false when the session is missing", () => {
		expect(hasSession(null)).toBe(false);
	});
});
