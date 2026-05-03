import { env } from "@huikka-stack/env/server";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { dbRelations } from "./relations";
import * as schema from "./schema";

export function createDb() {
	return drizzle(env.DATABASE_URL, { schema, relations: dbRelations });
}

export const db = createDb();

export async function checkDatabaseConnection() {
	await db.execute(sql`select 1`);
}

export { desc, eq, sql } from "drizzle-orm";
export * from "./schema";
