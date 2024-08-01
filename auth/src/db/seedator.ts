import { FileService } from '@common/utils';
import { join } from 'node:path';
import { config } from 'dotenv';
config({
  path: join(
    process.cwd(),
    `.env${process?.env?.NODE_ENV ? `.${process?.env?.NODE_ENV}` : ''}`,
  ),
});
import { db } from './database';

const FOLDER_PATH = '/src/db/seed';
const FULL_PATH = process.cwd() + FOLDER_PATH;

function seedAll(_input: string) {} //TODO: implement

async function seedSingle(input: string) {
  try {
    const content = await FileService.readDir(FULL_PATH);
    const item = content.filter((item) => item.includes(input));
    const entity = await (await import(FULL_PATH + `/${item}`)).seed();
    await db.insertInto('users').values(entity.data).execute();
  } catch (error) {
    console.error(
      `Error reading path: ${FULL_PATH} \n with input: ${input} \n error: ${error}`,
    );
  }
}

function seed() {
  const inputs = process.argv.slice(2);

  if (!inputs.length) {
    throw new Error('Inputs are not provided');
  }

  for (const input of inputs) {
    if (input === 'all') {
      seedAll(input);
      return;
    }
    seedSingle(input);
  }
}

seed();
