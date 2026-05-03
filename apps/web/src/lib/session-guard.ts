export function hasSession(
	session: { user?: { id?: string | null } | null } | null | undefined,
): session is { user: { id: string } } {
	return Boolean(session?.user?.id);
}
