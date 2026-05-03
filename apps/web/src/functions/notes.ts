import { createServerFn } from "@tanstack/react-start";

import { noteInputSchema } from "@/features/notes/note-types";
import { notesService } from "@/features/notes/notes-service";
import { requireSession } from "@/lib/require-session";
import { authMiddleware } from "@/middleware/auth";

export const getNotes = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const session = requireSession(context.session);

		return notesService.listForSession(session);
	});

export const createNote = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(noteInputSchema)
	.handler(async ({ context, data }) => {
		const session = requireSession(context.session);

		return notesService.createForSession(session, data);
	});
