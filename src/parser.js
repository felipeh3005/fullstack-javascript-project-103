import fs from 'node:fs';
import path from 'node:path';
import parseByExtension from './parsers';

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');

  return parseByExtension(filepath, content);
};

export default parseFile;
