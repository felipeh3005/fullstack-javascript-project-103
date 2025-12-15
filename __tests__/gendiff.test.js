import path from 'node:path';
import { fileURLToPath } from 'node:url';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff compares flat JSON files', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');

  const expected = [
    '{',
    '  - follow: false',
    '    host: codica.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
    '}',
  ].join('\n');

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});
