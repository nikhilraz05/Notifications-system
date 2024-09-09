// scripts/migration-helpers.mjs

import { config, database, up, down, status, create } from 'migrate-mongo';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load migrate-mongo configuration
const migrateMongoConfigPath = pathToFileURL(path.join(__dirname, '../models/migrate-mongo-config.mjs')).href;
const migrateMongoConfig = await import(migrateMongoConfigPath);

config.set(migrateMongoConfig.default);

async function connectToDatabase() {
  const { db, client } = await database.connect();
  return { db, client };
}

export async function createMigration(description) {
  try {
    const fileName = await create(description);
    console.log('Migration file created:', fileName);
  } catch (error) {
    console.error('Error creating migration:', error);
  }
}

export async function runMigrations() {
  try {
    const { db, client } = await connectToDatabase();
    const migrated = await up(db, client);
    migrated.forEach(fileName => console.log('Migrated:', fileName));
    await client.close();
  } catch (error) {
    console.error('Error running migrations:', error);
  }
}

export async function revertLastMigration() {
  try {
    const { db, client } = await connectToDatabase();
    const reverted = await down(db, client);
    reverted.forEach(fileName => console.log('Reverted:', fileName));
    await client.close();
  } catch (error) {
    console.error('Error reverting migration:', error);
  }
}

export async function migrationStatus() {
  try {
    const { db, client } = await connectToDatabase();
    const migrationStatus = await status(db);
    migrationStatus.forEach(({ fileName, appliedAt }) => {
      console.log(`${fileName}: ${appliedAt ? `Applied at ${appliedAt}` : 'Pending'}`);
    });
    await client.close();
  } catch (error) {
    console.error('Error fetching migration status:', error);
  }
}
