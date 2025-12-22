import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

const format = (diffTree, formatName = 'stylish') => {
  const formatter = formatters[formatName];

  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }

  return formatter(diffTree);
};

export default format;
