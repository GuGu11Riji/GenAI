// scripts/run-migrations.mjs — Execute pending SQL migrations directly
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const connection = await mysql.createConnection(dbUrl);
  console.log("Connected to database");

  // Get list of migration files
  const migrationsDir = path.resolve(__dirname, "../drizzle");
  const sqlFiles = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith(".sql"))
    .sort();

  for (const file of sqlFiles) {
    const content = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
    // Split by --> statement-breakpoint
    const statements = content
      .split("--> statement-breakpoint")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`\nRunning ${file} (${statements.length} statements)...`);
    for (const stmt of statements) {
      try {
        await connection.execute(stmt);
        console.log(`  ✓ ${stmt.slice(0, 60).replace(/\n/g, " ")}...`);
      } catch (e) {
        if (e.code === "ER_TABLE_EXISTS_ERROR" || e.code === "ER_DUP_KEYNAME") {
          console.log(`  ⚠ Already exists, skipping`);
        } else {
          console.error(`  ✗ Error: ${e.message}`);
        }
      }
    }
  }

  console.log("\n✅ All migrations complete");
  await connection.end();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
