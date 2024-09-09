// scripts/migrate.mjs

import { createMigration, runMigrations, revertLastMigration, migrationStatus } from './migration-helpers.mjs';

const operation = process.argv[2]; // Get the operation (create, up, down, status) from the command line
const migrationDescription = process.argv[3]; // For 'create' operation, this will be the migration description

async function main() {
  try {
    switch (operation) {
      case 'create':
        if (migrationDescription) {
          await createMigration(migrationDescription);
        } else {
          console.error('Please provide a migration description.');
        }
        break;
      case 'up':
        await runMigrations();
        break;
      case 'down':
        await revertLastMigration();
        break;
      case 'status':
        await migrationStatus();
        break;
      default:
        console.error('Invalid operation. Use "create", "up", "down", or "status".');
        break;
    }
  } catch (error) {
    console.error('Error running migration:', error);
  }
}

main();
