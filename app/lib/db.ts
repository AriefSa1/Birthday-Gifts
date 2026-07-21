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
  return row ? row.data : null;
}

export async function saveSectionData(section: string, data: unknown) {
  await ensureTable();
  const json = JSON.stringify(data);
  await getPool().query(
    "INSERT INTO answers (section, data) VALUES (?, CAST(? AS JSON)) ON DUPLICATE KEY UPDATE data = CAST(? AS JSON)",
    [section, json, json]
  );
}

export async function resetAllSections() {
  await ensureTable();
  await getPool().query("DELETE FROM answers");
}
