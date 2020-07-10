const replace = require('replace');

replace({
  regex: /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])(['"])/g,
  replacement: '#$1$1$2$2$3$3$4',
  paths: ['node_modules/@antv/f2'],
  recursive: true,
  silent: true,
});
