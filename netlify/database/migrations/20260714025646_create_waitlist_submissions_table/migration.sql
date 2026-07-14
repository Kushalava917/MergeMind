CREATE TABLE "waitlist_submissions" (
	"id" serial PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
