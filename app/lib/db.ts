import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
    });
  }
  return pool;
}

async function ensureTable() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS answers (
      section VARCHAR(32) PRIMARY KEY,
      data JSON NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

export async function getSectionData(section: string): Promise<unknown> {
  await ensureTable();
  const [rows] = await getPool().query(
    "SELECT data FROM answers WHERE section = ? LIMIT 1",
    [section]
  );
  const row = (rows as { data: unknown }[])[0];
  if (!row) return null;
  // MySQL's native JSON columns are auto-parsed by mysql2, but MariaDB's
  // JSON (a LONGTEXT alias) comes back as a raw string, so handle both.
  return typeof row.data === "string" ? JSON.parse(row.data) : row.data;
}

export async function saveSectionData(section: string, data: unknown) {
  await ensureTable();
  const json = JSON.stringify(data);
  // MariaDB's JSON type is a LONGTEXT alias and doesn't support CAST(... AS JSON)
  // (that's MySQL-only syntax), so the JSON string is bound directly here.
  await getPool().query(
    "INSERT INTO answers (section, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = ?",
    [section, json, json]
  );
}

export async function resetAllSections() {
  await ensureTable();
  await getPool().query("DELETE FROM answers");
}

export function describeDbError(err: unknown): string {
  if (err instanceof AggregateError) {
    return err.errors.map((e) => describeDbError(e)).join("; ");
  }
  if (err instanceof Error) {
    const code = (err as NodeJS.ErrnoException).code;
    return code ? `${code}: ${err.message}` : err.message;
  }
  return String(err);
}
