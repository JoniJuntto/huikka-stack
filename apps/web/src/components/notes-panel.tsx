import { Button } from "@huikka-stack/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@huikka-stack/ui/components/card";
import { Input } from "@huikka-stack/ui/components/input";
import { Label } from "@huikka-stack/ui/components/label";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { NoteInput, NoteRecord } from "@/features/notes/note-types";

type NotesPanelProps = {
	createNoteAction: (input: NoteInput) => Promise<NoteRecord>;
	initialNotes: NoteRecord[];
};

export default function NotesPanel({
	createNoteAction,
	initialNotes,
}: NotesPanelProps) {
	const [content, setContent] = useState("");
	const [isPending, startTransition] = useTransition();
	const [notes, setNotes] = useState(initialNotes);
	const [title, setTitle] = useState("");

	const submitNote = async () => {
		try {
			const createdNote = await createNoteAction({
				content,
				title,
			});

			setNotes((currentNotes) => [createdNote, ...currentNotes]);
			setTitle("");
			setContent("");
			toast.success("Saved a starter note");
		} catch {
			toast.error("Unable to save the note");
		}
	};

	return (
		<Card className="border-white/10 bg-white/5 backdrop-blur" size="sm">
			<CardHeader>
				<CardTitle>Reference Slice: Notes</CardTitle>
				<CardDescription>
					This route demonstrates the intended app path: authenticated UI,
					server function, and Drizzle persistence.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				<form
					className="grid gap-3"
					onSubmit={(event) => {
						event.preventDefault();

						startTransition(() => {
							void submitNote();
						});
					}}
				>
					<div className="grid gap-2">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							maxLength={80}
							name="title"
							onChange={(event) => setTitle(event.target.value)}
							placeholder="Add a short heading"
							required
							value={title}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="content">Content</Label>
						<textarea
							id="content"
							className="min-h-28 rounded-none border border-input bg-transparent px-2.5 py-2 text-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
							maxLength={280}
							name="content"
							onChange={(event) => setContent(event.target.value)}
							placeholder="Capture something small but real so downstream users can see the pattern."
							required
							value={content}
						/>
					</div>
					<Button disabled={isPending} type="submit">
						{isPending ? "Saving..." : "Create note"}
					</Button>
				</form>

				<div className="grid gap-3">
					<div className="flex items-center justify-between">
						<h2 className="font-medium text-sm">Recent notes</h2>
						<span className="text-muted-foreground text-xs">
							{notes.length} stored
						</span>
					</div>
					{notes.length > 0 ? (
						<div className="grid gap-3">
							{notes.map((savedNote) => (
								<article
									key={savedNote.id}
									className="border border-white/10 bg-black/10 p-3"
								>
									<div className="flex items-center justify-between gap-3">
										<h3 className="font-medium text-sm">{savedNote.title}</h3>
										<time className="text-muted-foreground text-xs">
											{new Date(savedNote.createdAt).toLocaleDateString()}
										</time>
									</div>
									<p className="mt-2 text-muted-foreground text-xs/relaxed">
										{savedNote.content}
									</p>
								</article>
							))}
						</div>
					) : (
						<div className="border border-white/10 border-dashed p-4 text-muted-foreground text-xs">
							No notes yet. Create one to verify the template&apos;s
							authenticated write path.
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
