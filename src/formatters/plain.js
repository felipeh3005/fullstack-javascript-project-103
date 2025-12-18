import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (value === null) {
    return 'null';
  }

  return String(value);
};

const formatPlain = (diffTree) => {
  const iter = (nodes, parentPath) => nodes
    .flatMap((node) => {
      const propertyPath = parentPath ? `${parentPath}.${node.key}` : node.key;

      switch (node.type) {
        case 'added':
          return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`;

        case 'removed':
          return `Property '${propertyPath}' was removed`;

        case 'changed':
          return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;

        case 'nested':
          return iter(node.children, propertyPath);

        case 'unchanged':
          return [];

        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });

  return iter(diffTree, '').join('\n');
};

export default formatPlain;
