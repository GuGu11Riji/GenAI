// scripts/migrate.mjs — Run pending migrations manually
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);

  console.log("Running migrations...");
  await migrate(db, {
    migrationsFolder: path.resolve(__dirname, "../drizzle"),
  });

  console.log("✅ Migrations complete");
  await connection.end();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
