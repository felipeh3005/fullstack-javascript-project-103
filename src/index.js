import parseFile from './parser.js';
import buildDiff from './buildDiff.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diffLines = buildDiff(data1, data2);

  return `{\n${diffLines.join('\n')}\n}`;
};

export default genDiff;
