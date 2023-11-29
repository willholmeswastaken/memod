import { Client } from "@upstash/qstash";
import { env } from "~/env";

const c = new Client({
	token: env.QSTASH_TOKEN,
});

export async function POST() {
	if (process.env.NODE_ENV === "development") {
		await c.publishJSON({
			topic: "memod.notify_reviewers",
			body: {
				participants: [{ name: "Jim", email: "jim@bob.com" }],
			},
		});
	}

	return new Response("created", {
		status: 201,
	});
}

export const runtime = "edge"; // 'nodejs' is the default
