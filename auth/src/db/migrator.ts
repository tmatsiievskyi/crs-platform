import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { Migrator, FileMigrationProvider } from 'kysely';
import { db } from './database';

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, './migrations'),
    }),
  });

  const operation = process.argv[2]?.split('=')[1];
  let migrationError: unknown = null;
  let migrationResults: unknown = null;

  switch (operation) {
    case 'latest': {
      const { error, results } = await migrator.migrateToLatest();
      migrationError = error;
      migrationResults = results;
      break;
    }
    case 'down': {
      const { error, results } = await migrator.migrateDown();
      migrationError = error;
      migrationResults = results;
      break;
    }
    default: {
      console.log('Not expected property');
      break;
    }
  }

  Array.isArray(migrationResults) &&
    migrationResults.forEach((it) => {
      if (it.status === 'Success') {
        console.log(
          `migration "${it.migrationName}" was executed successfully`,
        );
      } else if (it.status === 'Error') {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    });

  if (migrationError) {
    console.error('failed to migrate');
    console.error(migrationError);
    process.exit(1);
  }
}

migrateToLatest();
