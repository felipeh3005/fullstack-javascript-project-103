import parseFile from './parser';
import buildDiff from './buildDiff';
import format from './formatters';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diffTree = buildDiff(data1, data2);

  return format(diffTree, formatName);
};

export default genDiff;
