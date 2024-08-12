import { Config, defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
 
export default defineConfig({
  schema: "./db/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_NEON_DATABASE_URL || '',
  },
  verbose: true,
  strict: true,
} satisfies Config);
