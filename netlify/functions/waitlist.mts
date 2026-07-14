import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { waitlistSubmissions } from "../../db/schema.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async (request: Request) => {
  try {
    const body = (await request.json()) as { email?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || email.length > 320 || !emailPattern.test(email)) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const inserted = await db
      .insert(waitlistSubmissions)
      .values({ email })
      .onConflictDoNothing({ target: waitlistSubmissions.email })
      .returning({ id: waitlistSubmissions.id });

    return Response.json(
      { status: inserted.length ? "created" : "already_registered" },
      { status: inserted.length ? 201 : 200 },
    );
  } catch {
    return Response.json(
      { error: "We couldn't save your email. Please try again." },
      { status: 500 },
    );
  }
};

export const config: Config = {
  path: "/api/waitlist",
  method: "POST",
};
