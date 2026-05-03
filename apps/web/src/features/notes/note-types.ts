import { z } from "zod";

export const noteInputSchema = z.object({
	title: z.string().trim().min(1).max(80),
	content: z.string().trim().min(1).max(280),
});

export type NoteInput = z.infer<typeof noteInputSchema>;

export type NoteRecord = {
	id: string;
	userId: string;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
};
