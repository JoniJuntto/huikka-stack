import type { AppSession } from "@/lib/require-session";

import { type NoteInput, type NoteRecord, noteInputSchema } from "./note-types";

type CreateNoteParams = NoteInput & {
	userId: string;
};

export interface NotesRepository {
	create(input: CreateNoteParams): Promise<NoteRecord>;
	listByUserId(userId: string): Promise<NoteRecord[]>;
}

export function createNotesService(repository: NotesRepository) {
	return {
		async createForSession(session: AppSession, input: NoteInput) {
			const values = noteInputSchema.parse(input);

			return repository.create({
				...values,
				userId: session.user.id,
			});
		},
		async listForSession(session: AppSession) {
			return repository.listByUserId(session.user.id);
		},
	};
}
