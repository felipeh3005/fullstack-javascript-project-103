import yaml from 'js-yaml';

const parseYaml = (content) => yaml.load(content);

export default parseYaml;
