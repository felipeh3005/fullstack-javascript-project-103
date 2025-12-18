import _ from 'lodash';

const indentSize = 4;
const signOffset = 2;

const makeIndent = (depth) => ' '.repeat(depth * indentSize - signOffset);
const makeBracketIndent = (depth) => ' '.repeat(depth * indentSize);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    if (value === null) return 'null';
    if (typeof value === 'boolean') return String(value);
    if (typeof value === 'number') return String(value);
    if (typeof value === 'string') return value;
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(([key, val]) => {
    const rendered = stringify(val, depth + 1);
    return `${makeBracketIndent(depth)}${key}: ${rendered}`;
  });

  return ['{', ...lines, `${makeBracketIndent(depth - 1)}}`].join('\n');
};

const formatStylish = (diffTree) => {
  const iter = (nodes, depth) => nodes.flatMap((node) => {
    const { key, type } = node;
    const prefix = makeIndent(depth);

    switch (type) {
      case 'added':
        return `${prefix}+ ${key}: ${stringify(node.value, depth + 1)}`;

      case 'removed':
        return `${prefix}- ${key}: ${stringify(node.value, depth + 1)}`;

      case 'unchanged':
        return `${prefix}  ${key}: ${stringify(node.value, depth + 1)}`;

      case 'changed':
        return [
          `${prefix}- ${key}: ${stringify(node.oldValue, depth + 1)}`,
          `${prefix}+ ${key}: ${stringify(node.newValue, depth + 1)}`,
        ];

      case 'nested':
        return [
          `${prefix}  ${key}: {`,
          ...iter(node.children, depth + 1),
          `${makeBracketIndent(depth)}}`,
        ];

      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  return ['{', ...iter(diffTree, 1), '}'].join('\n');
};

export default formatStylish;
