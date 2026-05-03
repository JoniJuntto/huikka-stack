import { describe, expect, test } from "bun:test";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import type { NoteRecord } from "@/features/notes/note-types";
import { createNotesService } from "@/features/notes/notes-service-core";
import type { AppSession } from "@/lib/require-session";

import NotesPanel from "./notes-panel";

describe("notes panel", () => {
	test("creates and renders a new note through the reference slice action", async () => {
		const session: AppSession = {
			session: { id: "session_123" },
			user: {
				email: "starter@example.com",
				id: "user_123",
				name: "Starter User",
			},
		};

		const storedNotes: NoteRecord[] = [];

		const service = createNotesService({
			async create(input) {
				const createdNote: NoteRecord = {
					...input,
					createdAt: new Date("2026-05-03T12:00:00.000Z"),
					id: `note_${storedNotes.length + 1}`,
					updatedAt: new Date("2026-05-03T12:00:00.000Z"),
				};

				storedNotes.unshift(createdNote);

				return createdNote;
			},
			async listByUserId(userId) {
				return storedNotes.filter((note) => note.userId === userId);
			},
		});

		render(
			<NotesPanel
				createNoteAction={(input) => service.createForSession(session, input)}
				initialNotes={await service.listForSession(session)}
			/>,
		);

		fireEvent.change(screen.getByLabelText("Title"), {
			target: { value: "Starter checklist" },
		});
		fireEvent.change(screen.getByLabelText("Content"), {
			target: {
				value: "Keep one small authenticated write path in the template.",
			},
		});
		fireEvent.click(screen.getByRole("button", { name: "Create note" }));

		await waitFor(() => {
			expect(screen.getByText("Starter checklist")).toBeDefined();
		});

		expect(
			screen.getByText(
				"Keep one small authenticated write path in the template.",
			),
		).toBeDefined();
		expect(screen.getByText("1 stored")).toBeDefined();
	});
});
