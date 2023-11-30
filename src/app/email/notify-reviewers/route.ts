import { NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "~/env";
import { EmailTemplate } from "../../../components/EmailTemplate";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
	try {
		const { participants, memo } = await request.json();
		await Promise.all(
			participants.map(
				async (participant: { name: string; email: string }) =>
					await resend.emails.send({
						from: "Memod <memod@willdevsapps.com>",
						to: [participant.email],
						subject: "Memod: New Memo",
						react: EmailTemplate({ name: participant.name, memo }),
					}),
			),
		);
		return new Response("done", { status: 200 });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
