import { Link } from "@tanstack/react-router";

import UserMenu from "./user-menu";

export default function Header() {
	const links = [
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
	] as const;

	return (
		<header className="border-white/10 border-b bg-black/20 backdrop-blur">
			<div className="mx-auto flex max-w-6xl flex-row items-center justify-between px-4 py-3">
				<div className="flex items-center gap-8">
					<Link to="/" className="font-semibold uppercase tracking-[0.18em]">
						huikka-stack
					</Link>
					<nav className="flex gap-4 text-sm">
						{links.map(({ to, label }) => {
							return (
								<Link
									key={to}
									to={to}
									className="text-muted-foreground transition-colors hover:text-foreground"
								>
									{label}
								</Link>
							);
						})}
					</nav>
				</div>
				<div className="flex items-center gap-2">
					<UserMenu />
				</div>
			</div>
		</header>
	);
}
