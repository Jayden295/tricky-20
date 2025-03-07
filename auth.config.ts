// auth.config.ts
import GitHub from "@auth/core/providers/github";
import GitLab from "@auth/core/providers/gitlab";
import { defineConfig } from "auth-astro";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./src/db/schema.ts";

export default defineConfig({
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: import.meta.env.AUTH_GITHUB_ID,
      clientSecret: import.meta.env.AUTH_GITHUB_SECRET,
    }),
    GitLab({
      clientId: import.meta.env.AUTH_GITLAB_ID,
      clientSecret: import.meta.env.AUTH_GITLAB_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      // Ensure the user ID is included in the session
      if (session.user) {
        session.user = user;
      }
      return session;
    },
  },
});
