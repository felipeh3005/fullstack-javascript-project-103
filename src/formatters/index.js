import formatStylish from './stylish';
import formatPlain from './plain';
import formatJson from './json';

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
