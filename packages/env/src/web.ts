import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_SERVER_URL: z.url().default("http://localhost:3000"),
		VITE_RYBBIT_SITE_ID: z.string().min(1).optional(),
		VITE_RYBBIT_SCRIPT_SRC: z
			.url()
			.default("https://app.rybbit.io/api/script.js"),
	},
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
});
