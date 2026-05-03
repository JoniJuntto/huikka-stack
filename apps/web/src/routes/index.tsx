import { Button } from "@huikka-stack/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@huikka-stack/ui/components/card";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8">
			<section className="grid gap-6 border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 md:grid-cols-[1.3fr_0.7fr]">
				<div className="grid gap-4">
					<p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
						Public starter
					</p>
					<div className="grid gap-3">
						<h1 className="max-w-3xl font-semibold text-4xl leading-tight">
							huikka-stack is a Bun monorepo starter with auth, Drizzle,
							TanStack Start, and a small reference slice you can delete after
							launch.
						</h1>
						<p className="max-w-2xl text-muted-foreground text-sm/relaxed">
							The starter keeps the public contract explicit: shared packages
							stay shared, auth runs in the external server app, and the web app
							demonstrates an authenticated write path through server functions.
						</p>
					</div>
					<div className="flex flex-wrap gap-3">
						<Link to="/dashboard">
							<Button>Open dashboard slice</Button>
						</Link>
						<Link to="/login">
							<Button variant="outline">Create an account</Button>
						</Link>
					</div>
				</div>

				<Card className="border-white/10 bg-black/15">
					<CardHeader>
						<CardTitle>Golden path</CardTitle>
						<CardDescription>
							These are the only commands new users should need on day one.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="overflow-x-auto border border-white/10 bg-black/30 p-3 text-xs leading-6">
							{`bun install
bun run db:start
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
bun run db:push
bun run dev`}
						</pre>
					</CardContent>
				</Card>
			</section>

			<section className="grid gap-4 md:grid-cols-3">
				<Card className="border-white/10 bg-white/5">
					<CardHeader>
						<CardTitle>apps/web</CardTitle>
						<CardDescription>
							UI, routing, and TanStack Start server functions.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-muted-foreground text-sm/relaxed">
						The dashboard route includes a real authenticated notes flow to
						demonstrate the intended full-stack pattern.
					</CardContent>
				</Card>
				<Card className="border-white/10 bg-white/5">
					<CardHeader>
						<CardTitle>apps/server</CardTitle>
						<CardDescription>
							External API surface, Better Auth, health, and readiness.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-muted-foreground text-sm/relaxed">
						Server startup is driven by explicit URL and port config instead of
						hardcoded local defaults.
					</CardContent>
				</Card>
				<Card className="border-white/10 bg-white/5">
					<CardHeader>
						<CardTitle>packages/*</CardTitle>
						<CardDescription>Shared building blocks only.</CardDescription>
					</CardHeader>
					<CardContent className="text-muted-foreground text-sm/relaxed">
						Auth, DB, env, and UI packages stay reusable so product code does
						not leak into the shared layer.
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
