import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const waitlistSubmissions = pgTable("waitlist_submissions", {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
