import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@huikka-stack/ui/components/card";
import { createFileRoute } from "@tanstack/react-router";
import NotesPanel from "@/components/notes-panel";
import { getUser } from "@/functions/get-user";
import { createNote, getNotes } from "@/functions/notes";
import { requireSession } from "@/lib/require-session";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = requireSession(await getUser());

		return { session };
	},
	loader: async () => {
		return {
			notes: await getNotes(),
		};
	},
});

function RouteComponent() {
	const { session } = Route.useRouteContext();
	const { notes } = Route.useLoaderData();

	return (
		<main className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-8">
			<Card className="border-white/10 bg-white/5 backdrop-blur">
				<CardHeader>
					<CardTitle>Authenticated Dashboard</CardTitle>
					<CardDescription>
						This route stays intentionally small but real. It proves route
						protection, session access, and a write path backed by Drizzle.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-3 text-sm">
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
							Name
						</span>
						<span>{session.user.name}</span>
					</div>
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
							Email
						</span>
						<span>{session.user.email}</span>
					</div>
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
							Session
						</span>
						<span className="font-mono text-xs">{session.session.id}</span>
					</div>
				</CardContent>
			</Card>

			<NotesPanel
				createNoteAction={(input) => createNote({ data: input })}
				initialNotes={notes}
			/>
		</main>
	);
}
