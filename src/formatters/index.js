import formatStylish from './stylish.js';

const formatters = {
  stylish: formatStylish,
};

const format = (diffTree, formatName = 'stylish') => {
  const formatter = formatters[formatName];

  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }

  return formatter(diffTree);
};

export default format;
