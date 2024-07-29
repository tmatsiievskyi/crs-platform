import { FileService } from '@common/utils';

const FOLDER_PATH = '/src/db/seed';
const FULL_PATH = process.cwd() + FOLDER_PATH;

function seedAll(input: string) {
  console.log(input, process.cwd());
}

async function seedSingle(input: string) {
  try {
    console.log(input, process.cwd());
    const content = await FileService.readDir(FULL_PATH);
    console.log(content);
    const item = content.filter((item) => item.includes(input));
    const data = (await import(FULL_PATH + `/${item}`)).seed();
    console.log({ data });
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

  //   const regexp = new RegExp(pattern);
  //   console.log({ inputs, pattern, regexp, dd: process.cwd() });

  //   for (const input of inputs) {
  //     const fullPath = process.cwd() + FOLDER_PATH + input;
  //     const inputInfo = FileService.info(fullPath);
  //     console.log(inputInfo);

  //     if (inputInfo.isDirectory()) {
  //       const content = FileService.searchDir(fullPath);
  //       console.log(content);
  //     } else {
  //       const content = FileService.searchFile(fullPath);
  //       const module = await import()
  //       console.log(content);

  //     }
  //   }
}

seed();
