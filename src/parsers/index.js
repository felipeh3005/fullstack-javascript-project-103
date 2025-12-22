import path from 'node:path';

import parseJson from './json.js';
import parseYaml from './yaml.js';

const parsers = {
  '.json': parseJson,
  '.yml': parseYaml,
  '.yaml': parseYaml,
};

const parseByExtension = (filepath, content) => {
  const ext = path.extname(filepath);
  const parser = parsers[ext];

  if (!parser) {
    throw new Error(`Unsupported file extension: ${ext}`);
  }

  return parser(content);
};

export default parseByExtension;
