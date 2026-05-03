import { db, desc, eq, note } from "@huikka-stack/db";
import { createNotesService, type NotesRepository } from "./notes-service-core";

export function createDrizzleNotesRepository(): NotesRepository {
	return {
		async create(input) {
			const [createdNote] = await db
				.insert(note)
				.values({
					...input,
					id: crypto.randomUUID(),
				})
				.returning();

			if (!createdNote) {
				throw new Error("Failed to create note");
			}

			return createdNote;
		},
		async listByUserId(userId) {
			return db
				.select()
				.from(note)
				.where(eq(note.userId, userId))
				.orderBy(desc(note.createdAt));
		},
	};
}

export const notesService = createNotesService(createDrizzleNotesRepository());
