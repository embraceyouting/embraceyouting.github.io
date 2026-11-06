import { copyFile, mkdir, rm, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['index.html', 'styles.css', 'script.js'];
const destination = join(root, 'dist');

for (const file of files) {
  const source = join(root, file);
  if (!(await stat(source)).isFile()) {
    throw new Error(`Required website source is not a file: ${file}`);
  }
}

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const file of files) {
  await copyFile(join(root, file), join(destination, file));
}

console.log('Built Sites static files in dist/.');
